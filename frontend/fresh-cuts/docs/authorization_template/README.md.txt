The files (ReturnFail.js, ReturnSuccess.js) in this folder show some ways of invoking a lambda function with authentication (requires user sign in).

The way it works is each lambda function (backend will provide) will require authentication tokens from a user signing in (cognito will provide).
Once you provide the authentication tokens via the headers parameter and use axios to call the lambda function, it should work. 

The examples in this folder use the lambda functions: Return_Fail (return 404), and Return_Success (return 200)

There will be some cases where the lambda functions are not going to need authentication and you can verify whether a lambda function requires authentication
by taking the url and pasting it into your browser.

Return_Fail: https://7zeou1i376.execute-api.us-west-1.amazonaws.com/Return_Fail
This will return the values intended as there are no authentication

Return_Success: https://7zeou1i376.execute-api.us-west-1.amazonaws.com/Return_Success
This will return unauthorized as it is configured to require authentication.

The code in both files are nearly identical aside from the HTML messages. 