import json
import pymysql
import os

def lambda_handler(event, context):
    db_endpoint = os.environ.get('DB_ENDPOINT')
    db_username = os.environ.get('DB_USERNAME')
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
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM Appointment;")

        result = cursor.fetchall()
        cursor.close()
        connection.close()

        for item in result:
            item['scheduled_at'] = str(item['scheduled_at'])

        result_json = json.dumps(result)

        return {
            "statusCode": 200,
            "body": result_json
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
        }