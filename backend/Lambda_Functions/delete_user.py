import pymysql
import os
import json

def lambda_handler(event, context):
    # Configuration values
    endpoint = os.environ['DB_ENDPOINT']
    username = os.environ['DB_USERNAME']
    password = os.environ['DB_PASSWORD']
    database_name = os.environ['DB_NAME']
    
    # Parse the user ID from the event
    try:
        body = json.loads(event['body'])
        user_id = body['user_id']
    except (json.JSONDecodeError, KeyError):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid request body or missing user_id'})
        }
    
    # Initialize connection inside the handler
    connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)
    
    try:
        with connection.cursor() as cursor:
            # Delete user from the database
            sql = "DELETE FROM User_Profile WHERE id = %s"
            cursor.execute(sql, (user_id,))
            connection.commit()
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'User deleted successfully'})
        }
    except Exception as e:
        # Log the exception to a monitoring service or stdout
        print(str(e))
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'An error occurred'})
        }
    finally:
        # Ensure the connection is closed even if an exception occurs
        connection.close()