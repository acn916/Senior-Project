import json
import pymysql
import os
from datetime import timedelta
from decimal import Decimal

# translates values to necessary type
class translate(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        elif isinstance(obj, timedelta):
            return str(obj)
        return super().default(obj)



def lambda_handler(event, context):
    db_endpoint = os.environ.get('DB_ENDPOINT')
    db_username = os.environ.get('DB_USER')
    db_password = os.environ.get('DB_PASSWORD')
    db_name = os.environ.get('DB_NAME')

    try:
        connection = pymysql.connect(
            host=db_endpoint,
            user=db_username,
            password=db_password,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor
        )

        # Retrieve the service ID from the path parameters
        service_id = event['pathParameters']['id']

        # Retrieve the updated data from the request body
        updated_data = event['body']

        cursor = connection.cursor()
        
         # Create query and execute the query
        query = "SELECT * FROM Service WHERE id = %s;"
        cursor.execute(query, (service_id,))
        
        # store results 
        existing_data = cursor.fetchone()

        # check if exisiting data is not empty/ is found
        if existing_data:
            # for each [key, value] pair in the updated data 
            for key, updated_value in updated_data.items():
                # retrieve the existing data for the current key
                existing_value = existing_data.get(key)
                # check if the exisitng value exists and is not changed
                if existing_value is not None and existing_value != updated_value:
                    update_query = "UPDATE Service SET " + key + " = %s WHERE id = %s;"
                    cursor.execute(update_query, (updated_value, service_id))

            connection.commit()
            cursor.close()
            connection.close()

            return {
                "statusCode": 200,
                "body": json.dumps({"message": "Service updated successfully"}, cls=translate)
            }
        else:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Service not found"}),
            }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}, cls=translate)
        }
