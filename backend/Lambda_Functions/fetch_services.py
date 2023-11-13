import json
from datetime import timedelta
from decimal import Decimal
import pymysql
import os

# Custom JSON encoder to handle both Decimal and timedelta objects
class CustomEncoder(json.JSONEncoder):
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
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Service;")
        result = cursor.fetchall()
        cursor.close()
        connection.close()

        result_json = json.dumps(result, cls=CustomEncoder)

        return {
            "statusCode": 200,
            "body": result_json
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),

        }
