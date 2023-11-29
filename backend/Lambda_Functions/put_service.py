import json
import os
import mysql.connector
from mysql.connector import Error
from datetime import datetime

'''
    event = {
                "id": , 
                "name": "", 
                "description": "", 
                "duration": "", 
                "price": 
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
                id = body["id"]
                name = body["name"]
                description = body["description"]
                duration = body["duration"]
                price = body["price"]

                # Check types
                if not isinstance(id, int):
                    raise ValueError(f"Invalid id: {id}")
                if not isinstance(name, str):
                    raise ValueError(f"Invalid name: {name}")
                if not isinstance(description, str):
                    raise ValueError(f"Invalid description: {description}")
                if not isinstance(price, (int, float)):
                    raise ValueError(f"Invalid price: {price}")
                
                # Check duration format
                try:
                    datetime.strptime(duration, '%H:%M:%S')
                except ValueError:
                    raise ValueError(f"Invalid duration format: {duration}, should be 'HH:MM:SS'")
                
            except (KeyError, ValueError) as e:
                return {
                    'statusCode': 400,
                    'body': json.dumps({"error": f"Invalid or missing key in input: {str(e)}"})
                }

            # Query to get stylists that can do the service
            query = """UPDATE Service
                       SET name = %s, description = %s, duration = %s, price = %s
                       WHERE id = %s;"""
            cursor.execute(query, (name, description, duration, price, id))
            connection.commit()

            return {
                'statusCode': 200,
                'body': json.dumps({"message": "Service updated successfully"})
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
            