import json
import os
import mysql.connector
from mysql.connector import Error

def lambda_handler(event, context):
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
            query = """SELECT User_Profile.id, User_Profile.email, User_Profile.first_name, User_Profile.last_name, User_Profile.phone
                       FROM User_Profile
                       WHERE user_role = 'Client';"""
            cursor.execute(query)
            users = cursor.fetchall()

            return {
                'statusCode': 200,
                'body': json.dumps(users)
            }

    except Error as e:
        return {
            'statusCode': 500,
            'body': json.dumps({"error": str(e)})
        }
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()

