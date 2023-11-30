import json
import os
import mysql.connector
from mysql.connector import Error

''' event = {
                "cognito_user_id": "",
                "email": "",
                "first_name": "",
                "last_name": "",
                "phone": "",
                "user_role": ""
            }
'''
def lambda_handler(event, context):
    connection = None
    cursor = None
    try:
        connection = mysql.connector.connect(
            host=os.environ["DB_HOST"],
            database=os.environ["DB_NAME"],
            user=os.environ["DB_USER"],
            password=os.environ["DB_PASSWORD"]
        )
        
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            body = json.loads(event["body"])

            try:
                cognito_user_id = body["cognito_user_id"]
                email = body["email"]
                first_name = body["first_name"]
                last_name = body["last_name"]
                phone = body["phone"]
                user_role = body["user_role"]
            except KeyError as e:
                return {
                    'statusCode': 400,
                    'body': json.dumps({"error": f"Missing key in input: {str(e)}"})
                }

            # Query to get stylists that can do the service
            query = """INSERT INTO User_Profile (cognito_user_id, email, first_name, last_name, phone, user_role)
                       VALUES (%s, %s, %s, %s, %s, %s);"""
            cursor.execute(query, (cognito_user_id, email, first_name, last_name, phone, user_role))
            connection.commit()

            return {
                'statusCode': 200,
                'body': json.dumps({"message": "User profile created successfully"})
            }

    except Error as e:
        return {
            'statusCode': 500,
            'body': json.dumps({"error": str(e)})
        }
    finally:
        if connection and connection.is_connected():
            if cursor:
                cursor.close()
            connection.close()