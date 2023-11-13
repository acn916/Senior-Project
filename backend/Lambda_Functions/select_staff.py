import json
import os
import mysql.connector
from mysql.connector import Error

def lambda_handler(event, context):
    query_parameters = event.get("queryStringParameters")
    if query_parameters:
        service_id = query_parameters.get("service_id")
    try:
        connection = mysql.connector.connect(
            host=os.environ["DB_HOST"],
            database=os.environ["DB_NAME"],
            user=os.environ["DB_USER"],
            password=os.environ["DB_PASSWORD"]
        )
        
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)

            # Query to get stylists that can do the service
            query = """SELECT User_Profile.id, User_Profile.first_name, User_Profile.last_name
                       FROM User_Profile 
                       JOIN Staff_Service ON User_Profile.id = Staff_Service.staff_id
                       JOIN Service ON Staff_Service.service_id = Service.id
                       WHERE Service.id = %s AND User_Profile.user_role = 'Staff';"""
            cursor.execute(query, (service_id,))
            stylists = cursor.fetchall()

            return {
                'statusCode': 200,
                'body': json.dumps(stylists)
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