import json
import pymysql
import os
from json import JSONEncoder
from datetime import datetime

class DateTimeEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        return JSONEncoder.default(self, o)

def lambda_handler(event, context):
    # get the service id from the path
    staff_id = event['pathParameters']['staff_id']

    #configure the credentials
    db_endpoint = os.environ.get('DB_ENDPOINT')
    db_username = os.environ.get('DB_USER')
    db_password = os.environ.get('DB_PASSWORD')
    db_name = os.environ.get('DB_NAME')

    try:
        # establish connection
        connection = pymysql.connect(
            host = db_endpoint,
            user = db_username,
            password = db_password,
            database = db_name,
            cursorclass = pymysql.cursors.DictCursor
        )

        # retrive cursor
        cursor = connection.cursor()

        # Create query and execute the query
        query = "SELECT * FROM Staff_Availability WHERE staff_id = %s;"
        cursor.execute(query, (staff_id))

        # store results
        result = cursor.fetchall()

        # end connections
        cursor.close()
        connection.close()

        # check if result is empty or not
        if result:
            result_json = json.dumps(result, cls=DateTimeEncoder)
            return {
                "statusCode": 200,
                "body": result_json
            }
        else:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Service not found"}),
            }
    # handle errors
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
        }