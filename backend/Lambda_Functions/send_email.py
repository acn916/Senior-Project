import json
import boto3

def lambda_handler(event, context):
    try:
        client = boto3.client("ses")
        
        # Read in data
        jsonBody = json.loads(event["body"])
        
        # Extract required fields
        service_name = jsonBody["service_name"]
        stylist_name = jsonBody["stylist_name"]
        confirmation_timestamp = jsonBody["confirmation_timestamp"]
        email = jsonBody["email"]
        
        # Compose email message
        subject = "Red Salon Art Booking Summary"
        body = f"{service_name} with {stylist_name} has been scheduled at {confirmation_timestamp}."
        
        # Construct message object
        message = {
            "Subject": {"Data": subject},
            "Body": {"Html": {"Data": body}}
        }
        
        # Send email
        response = client.send_email(
            Source="YOUR_EMAIL_HERE@gmail.com",
            Destination={"ToAddresses": [email]},
            Message=message
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({"message": "Email sent successfully", "response": response})
        }
    
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({"error": f"Missing key in input: {str(e)}"})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({"error": f"Internal server error: {str(e)}"})
        }
