import json
import pymysql
import os
from datetime import datetime, date, timedelta
from urllib.parse import parse_qs


def lambda_handler(event, context):
    
    query_params = event.get('queryStringParameters', {})
    service_id = query_params.get('service')
    stylist_id = query_params.get('stylist')
    date_str = query_params.get('date')
    
    # Check if any of the required parameters are missing
    if service_id is None or stylist_id is None or date_str is None:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing required parameters"})
        }
    
    # Convert the date string to datetime object
    try:
        date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid date format"})
        }
    
    #configure the credentials
    db_endpoint = os.environ.get('DB_ENDPOINT')
    db_username = os.environ.get('DB_USER')
    db_password = os.environ.get('DB_PASSWORD')
    db_name = os.environ.get('DB_NAME')
    
    try:

        #establish a connection
        connection = pymysql.connect(
        
            host = db_endpoint,
            user = db_username,
            password = db_password,
            database = db_name,
            cursorclass = pymysql.cursors.DictCursor
            
        )
        

        cursor = connection.cursor()
        
        time_slots = generate_full_day_time_slots(connection, stylist_id, date)
        
        cursor.close()
        connection.close()
        return {
            "statusCode": 200,
            "body": json.dumps(time_slots)
        }
        
        
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
        }
    
    
def get_existing_appointments(connection, stylist_id, date):
    try:
        with connection.cursor() as cursor:
            sql = """
                SELECT scheduled_at
                FROM Appointment
                WHERE staff_id = %s AND DATE(scheduled_at) = %s
            """
            cursor.execute(sql, (stylist_id, date))
            result = cursor.fetchall()
            appointments = [{'scheduled_at': item['scheduled_at']} for item in result]
            
            return appointments
    except Exception as e:
        return {
            "statusCode": 404,
            "body": json.dumps({"error": str(e)})
        }

    
def is_date_within_staff_unavailability(connection, stylist_id, the_date):
    try:
        with connection.cursor() as cursor:
            sql = """
                SELECT start, end
                FROM Staff_Availability
                WHERE staff_id = %s
            """
            cursor.execute(sql, (stylist_id))
            result = cursor.fetchall()
            
            # Convert provided date to datetime.date if it's not already
            if not isinstance(the_date, date):
                the_date = datetime.strptime(the_date, "%Y-%m-%d").date()

            # Check if the_date falls within any staff unavailability period
            for item in result:
                start_date = item['start'].date()
                end_date = item['end'].date()
                print("start, the_date, end", start_date, the_date, end_date)
                if start_date <= the_date <= end_date:
                    return True
                
            return False

    except Exception as e:
        return False

        
def generate_full_day_time_slots(connection, stylist_id, the_date):
    
    start_time = datetime.strptime('09:00', '%H:%M')
    end_time = datetime.strptime('20:00', '%H:%M')
    time_slots = []
    
    is_not_available = is_date_within_staff_unavailability(connection, stylist_id, the_date)
    if is_not_available:
        return time_slots
    
    existing_appointments = get_existing_appointments(connection, stylist_id, the_date)
    existing_appointment_times = set()
    for appointment in existing_appointments:
        existing_appointment_times.add(appointment['scheduled_at'].strftime('%H:%M'))

    # Generate time slots
    current_time = start_time
    while current_time < end_time:
        time_slot = current_time.strftime('%H:%M')
        if time_slot not in existing_appointment_times:
            time_slots.append(time_slot)
        current_time += timedelta(minutes=30)
    
    return time_slots
