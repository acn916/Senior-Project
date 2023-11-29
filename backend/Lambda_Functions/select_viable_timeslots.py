import os
import json
import mysql.connector
from datetime import datetime, timedelta
from mysql.connector import Error
import itertools
import time

connection = None
cursor = None

def unique_elements(input_list):
    if (all(isinstance(i, list) for i in input_list)):   # Check if input list is a list of lists
        return list(set(element for sublist in input_list for element in sublist))
    elif isinstance(input_list, list):
        return list(set(input_list))
    else:
        raise TypeError("Input should be a list or list of lists")

def get_all_unique_stylist_ids(combination_of_stylists):
    return unique_elements(combination_of_stylists)

def extract_all_service_ids(services):
    service_ids = []
    for service in services:
        service_ids.append(service["serviceID"])
    
    return service_ids

def extract_all_stylists(services):
    stylists = []
    for service in services:
        stylists.append(service["stylistIDs"])
    
    return stylists

def convert_seconds(seconds):
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    remaining_seconds = seconds % 60

    return hours, minutes, remaining_seconds

def find_every_combination_of_stylists(stylists):
    return [list(t) for t in itertools.product(*stylists)]

def get_service_duration_given_list_and_id(service_durations, service_id):
    for duration in service_durations:
        if (duration["service_id"] == service_id):
            return duration["service_duration"]

def get_staff_service_table():
    cursor.execute(f"""
                    SELECT *
                    FROM Staff_Service
                """)
    return cursor.fetchall()

def get_appointment_table(date):
    cursor.execute(f"""
                    SELECT *
                    FROM Appointment a
                    JOIN Service s ON a.service_id = s.id
                    WHERE DATE(a.scheduled_at) = '{date}'
                    AND a.status != 'Cancelled'
                    AND a.status != 'No-Show'
                """)
    return cursor.fetchall()

def get_staff_table():
    cursor.execute(f"""
                    SELECT up.id, up.first_name, up.last_name
                    FROM User_Profile up
                    WHERE up.user_role = "Staff"
                    OR up.user_role = "Admin"
                """)
    return cursor.fetchall()

def filter_viable_combinations_based_on_staff_ability(combination_of_stylists, service_ids, staff_service_table):
    viable_combinations = []
    for combination in combination_of_stylists:
        viable = []
        for i in range(len(combination)):
            for j in range(len(staff_service_table)):
                if (combination[i] == staff_service_table[j]["staff_id"] and staff_service_table[j]["service_id"] == service_ids[i]):
                    viable.append(True)
        
        # This can probably be done better
        if (all(viable) and len(viable) == len(combination)):
            viable_combinations.append(combination)
    
    return viable_combinations

def get_service_duration(service_id):
    cursor.execute(f"""
        SELECT *
        FROM Service s 
        WHERE s.id  = {service_id}
    """)
    service_info = cursor.fetchone()
    hours, minutes, seconds = convert_seconds(service_info["duration"].total_seconds())

    return {"service_id": service_id, "service_duration":{"hours": hours, "minutes": minutes}}

def get_all_service_duration(service_ids):
    service_durations = []
    for service_id in service_ids:
        service_durations.append(get_service_duration(service_id))
    
    return service_durations

def get_services_table(service_ids):
    cursor.execute("""
            SELECT *
            FROM Service
            WHERE id IN ({})
        """.format(', '.join(['%s'] * len(service_ids))), 
            tuple(service_ids))

    services_table = cursor.fetchall()

    return services_table

def get_service_given_list_and_id(services_table, service_id):
    for service in services_table:
        if (service["id"] == service_id):
            return service

def get_object_by_id(data, id):
    return next((item for item in data if item["id"] == id), None)

def get_stylist_availability(stylist_id, date):
    all_availabilities = []
    cursor.execute(f"""
                    SELECT *
                    FROM Staff_Availability sa
                    WHERE DATE(sa.start) = '{date}'
                    AND sa.staff_id = {stylist_id}
                """)
    stylist_availability = cursor.fetchall()
    for availability in stylist_availability:
        all_availabilities.append({"start": availability["start"], "end": availability["end"]})

    return {"stylist_id": stylist_id, "stylist_availiability": all_availabilities}

def get_stylist_availability_given_list_and_id(stylist_availabilities, stylist_id):
    for availability in stylist_availabilities:
        if (availability["stylist_id"] == stylist_id):
            return availability["stylist_availiability"]

def get_all_stylist_availiability(unique_stylist_ids, date):
    stylist_availabilities = []
    for stylist_id in unique_stylist_ids:
        stylist_availabilities.append(get_stylist_availability(stylist_id, date))

    return stylist_availabilities

def are_times_conflicting(range_start, range_end, start_time, end_time):
    if range_start <= start_time <= range_end or range_start <= end_time <= range_end:
        return True
    if start_time <= range_start <= end_time or start_time <= range_end <= end_time:
        return True
    return False

def is_time_within_range(range_start, range_end, start_time, end_time):
    if (range_start <= start_time and range_end >= end_time):
        return True

def is_time_within_schedule(stylist_availability, start_time, end_time):
    for availability in stylist_availability:
        if (is_time_within_range(availability["start"], availability["end"], start_time, end_time)):
            return True
    
    return False
 
def is_combination_viable(stylist_combination, ordered_service_ids, stylist_availabilities, service_durations, start_time, arr):
    if not stylist_combination:
        return True
    else:
        stylist_id = stylist_combination[0]
        service_id = ordered_service_ids[0]
        stylist_availiabilty = get_stylist_availability_given_list_and_id(stylist_availabilities, stylist_id)
        service_duration = get_service_duration_given_list_and_id(service_durations, service_id)

        end_time = start_time + timedelta(hours=service_duration["hours"], minutes=service_duration["minutes"])
        if (is_time_within_schedule(stylist_availiabilty, start_time, end_time)):
            arr.append({"start": start_time, "end": end_time})
            return is_combination_viable(stylist_combination[1:], ordered_service_ids[1:], stylist_availabilities, service_durations, end_time, arr)

def filter_viable_combinations_based_on_employee_schedules(combination_of_stylists, ordered_service_ids, stylist_availabilities, service_durations):
    potentially_viable_combinations = []

    for i in range(len(combination_of_stylists)):
        stylist_combination = combination_of_stylists[i]
        # Assuming order in database
        leader_stylist_availability = get_stylist_availability_given_list_and_id(stylist_availabilities, stylist_combination[0])
        if (not leader_stylist_availability):
            continue
        for availability in leader_stylist_availability:
            # May need to add a check to make sure the availabilities are in order
            range_start = availability["start"]
            range_end = availability["end"]
            init_time = availability["start"]
            while (is_time_within_range(range_start, range_end, init_time, init_time)):
                arr = []
                if (is_combination_viable(combination_of_stylists[i], ordered_service_ids, stylist_availabilities, service_durations, init_time, arr)):
                    potentially_viable_combinations.append({"init_time": init_time, "specific_times": arr, "stylist_ids": stylist_combination})
                init_time = init_time + timedelta(minutes=15)
    
    return potentially_viable_combinations

def filter_viable_combinations_based_on_existing_appointments(combination_of_stylists, appointment_table):
    viable_combinations = []

    for stylists_information in combination_of_stylists:
        viable = True
        stylist_combination = stylists_information["stylist_ids"]
        for i in range(len(stylist_combination)):
            if (viable):
                stylist_id = stylist_combination[i]
                range_start = stylists_information["specific_times"][i]["start"]
                range_end = stylists_information["specific_times"][i]["end"]
                for appointment in appointment_table:
                    hours, minutes, seconds = convert_seconds(appointment["duration"].total_seconds())
                    appointment_start_time = appointment["scheduled_at"]
                    appointment_end_time = appointment_start_time + timedelta(hours=hours, minutes=minutes)
                    if appointment["staff_id"] == stylist_id and are_times_conflicting(range_start, range_end, appointment_start_time, appointment_end_time):
                        viable = False
                        break
            else:
                break
        if (viable):
            viable_combinations.append(stylists_information)
    
    return viable_combinations


def lambda_handler(event, context):
    global connection, cursor
    try:
        connection = mysql.connector.connect(
            host=os.environ["DB_HOST"],
            database=os.environ["DB_NAME"],
            user=os.environ["DB_USER"],
            password=os.environ["DB_PASSWORD"]
        )
        
        if (connection.is_connected()):
            cursor = connection.cursor(dictionary=True)
            # Expected json body
            # body = json.loads('{"date":"2023-12-02","services":[{"serviceID":1,"stylistIDs":[5]}, {"serviceID":5,"stylistIDs":[5,6]}]}')
            body = json.loads(event.get("body"))
            date = body["date"]
            services = body["services"]

            combination_of_stylists = find_every_combination_of_stylists(extract_all_stylists(services))
            all_unique_stylist_ids = get_all_unique_stylist_ids(combination_of_stylists)
            stylist_availabilities = get_all_stylist_availiability(all_unique_stylist_ids, date)
            staff_service_table = get_staff_service_table()
            
            service_ids = extract_all_service_ids(services)
            service_durations = get_all_service_duration(service_ids)

            appointment_table = get_appointment_table(date)

            staff_table = get_staff_table()

            services_table = get_services_table(service_ids)

            combination_of_stylists = filter_viable_combinations_based_on_staff_ability(combination_of_stylists, service_ids, staff_service_table)
            combination_of_stylists = filter_viable_combinations_based_on_employee_schedules(combination_of_stylists, service_ids, stylist_availabilities, service_durations)
            combination_of_stylists = filter_viable_combinations_based_on_existing_appointments(combination_of_stylists, appointment_table)

            all_options = []
            for combination in combination_of_stylists:
                init_time = combination["init_time"].isoformat()
                appointments = []
                for i in range(len(combination["stylist_ids"])):
                    stylist = get_object_by_id(staff_table, combination["stylist_ids"][i])
                    times = {"start": combination["specific_times"][i]["start"].isoformat(), "end": combination["specific_times"][i]["end"].isoformat()}

                    service = get_service_given_list_and_id(services_table, service_ids[i])
                    service["duration"] = str(service["duration"])
                    service["price"] = float(service["price"])

                    appointment = {
                        "stylist": stylist,
                        "service": service,
                        "times": times
                    }
                    appointments.append(appointment)

                option = {
                    "init_time": init_time,
                    "appointments": appointments
                }
                all_options.append(option)
            return {
                "statusCode": 200,
                "body": json.dumps(all_options)
            }

    except Error as e:
        print("Error while connecting to MySQL", e)
        return {
            'statusCode': 500,
            'body': json.dumps({"error": str(e)})
        }
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()