import json
import pymysql
import urllib3
import os

def lambda_handler(event, context):
    # Database credentials
    db_host = os.environ.get('DB_ENDPOINT')
    db_user = os.environ.get('DB_USERNAME')
    db_password = os.environ.get('DB_PASSWORD')
    db_name = os.environ.get('DB_NAME')
    
    try:
        # Connect to the database
        connection = pymysql.connect(host=db_host, user=db_user, passwd=db_password, db=db_name)
        with connection.cursor() as cursor:
            i = 0
            for data in event:
                client_id = data['client_id']
                staff_id = data['staff_id']
                service_id = data['service_id']
                scheduled_at = data['scheduled_at']
                status = data['status']
                sql = "INSERT INTO Appointment (client_id, staff_id, service_id, scheduled_at, status) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(sql, (client_id, staff_id, service_id, scheduled_at, status))
                i += 1

        # connection is not autocommit by default, so we must commit to save changes
        connection.commit()
        
        cursor.close()
        connection.close()
    except Exception as e:
        return {
            'statuseCode': 500,
            "body": json.dumps({"error": str(e)})
        }

    return {
        'statusCode': 200,
        'body': json.dumps('Successfully inserted data')
    }