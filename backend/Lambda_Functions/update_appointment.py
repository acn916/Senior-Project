import json
import pymysql
import os

def lambda_handler(event, context):

    #Specify the credentials using the environment variables
    db_endpoint = os.environ.get('DB_ENDPOINT')
    db_username = os.environ.get('DB_USERNAME')
    db_password = os.environ.get('DB_PASSWORD')
    db_name = os.environ.get('DB_NAME')

    try:
        # Retrieve the ID from the URL
        event = json.loads(event)
        appointment_id = event['id']

        if not appointment_id:
            raise ValueError("Appointment ID not provided in the request URL")

        client_id = event['client_id']
        staff_id = event['staff_id']
        service_id = event['service_id']
        scheduled_at = event['scheduled_at']
        status = event['status']
        notes = event['notes']
        confirmation_timestamp = event['confirmation_timestamp']
        cancellation_reason = event['cancellation_reason']

        # create a connection to the database
        connection = pymysql.connect(

            host=db_endpoint,
            user=db_username,
            password=db_password,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor
        )

        cursor = connection.cursor()

        update_query = """ 
    		UPDATE Appointment
    		SET client_id=%s, staff_id=%s, service_id=%s, scheduled_at=%s, status=%s, notes=%s, confirmation_timestamp=%s, cancellation_reason=%s
    		WHERE id=%s
    	"""

        cursor.execute(update_query, (client_id, staff_id, service_id, scheduled_at, status, notes, confirmation_timestamp, cancellation_reason, appointment_id))

        connection.commit()

        cursor.close()
        connection.close()

        # return success code 200 for successful PUT
        return {
            'statusCode': 200,
            'body': json.dumps('Successfully updated appointment')
        }

    except Exception as e:
        return{
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }