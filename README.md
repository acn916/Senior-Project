# Team Entrecodeurs CSC Senior Project

<p align="center">
<a href="https://ibb.co/xqMtdyc"><img src="https://i.ibb.co/5h5gwdz/Homepage.png" alt="Homepage" border="0"></a>
</p>

<p align="center">
This repository contains the codebase for an online scheduling system designed for beauty salons. To schedule an appointment, the system allows clients to select from a list of available services, select one or more stylists, and pick a date that fits their schedule. From there, stylists can input their schedules, and select whether or not to accept or decline incoming appointment requests.
</p>

<p align="center">
<a href="#repository-structure">Repository Structure</a> &nbsp;&bull;&nbsp;
<a href="#project-architecture">Project Architecture</a> &nbsp;&bull;&nbsp;
<a href="#contributing">Contributing</a> &nbsp;&bull;&nbsp;
<a href="#deployment">Deployment</a> &nbsp;&bull;&nbsp;
<a href="#testing">Testing</a> &bull;&nbsp;
<a href="#application-views">Application Views</a>
</p>

<p align="center">
<a href="#team-members">Team Members</a> &nbsp;&bull;&nbsp;
<a href="#contact">Contact</a>
</p>

## Repository Structure

This repository consists of two main directories:

- `frontend/` - Contains the ReactJS code for the client-facing part of the application.
- `backend/` - Contains the code for the server-side part of the application.

<div align="right"> <a href="#team-entrecodeurs-csc-senior-project">Back to top</a> </div>

## Project Architecture

### Frontend

Our frontend is constructed using ReactJS, an efficient and flexible JavaScript library. The frontend assets are hosted and served using Amazon S3, an AWS service renowned for its scalability and robustness.

### Backend

The backend architecture is serverless, built around AWS services. It's exposed through the AWS API Gateway, which triggers events to AWS Lambda. Our Lambda functions are written in Python, providing a responsive and efficient service. The database is handled by AWS Aurora, a cloud-based relational database service compatible with MySQL. This architecture ensures scalability, maintainability, and resilience.

## Application Views

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/rcWjzmq/Home-Page1.png" alt="Home1" border="0"></a>
<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/RCNRgNv/Home-Page2.png" alt="Home2" border="0"></a>

The home page is what every visiting user will first see, providing access to salon information, site navigation, and contact info. By selecting either 'services', 'staff', 'login', or 'book now', the user will be directed to the respective page.

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/k55WbZB/Services.png" alt="Services" border="0"></a>

The services page provides a detailed look at the various options the salon offers, while also providing an estimated price. From here a potential customer can select 'request' to navigate to the booking page.

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/BsQ3VBM/Stylists.png" alt="Stylists" border="0"></a>

The staff page provides details on all current stylists at the salon, giving the user the option to 'book' with that stylist, or navigate to that stylists Instagram page via the associated Instagram logo.

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/hMXWNRZ/Booking.png" alt="Booking" border="0"></a>

The booking page allows a customer to select their preferred stylist, picking out one or more services for that stylist to perform, and what date they would like to have that work done. Once these options are selected, the user can hit 'search'. This will populate all available times for that stylist given the selected options. If no times are available, a message will be displayed informing the user as such. Once a valid time is selected, the user will be navigated to the request page.

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/tpgdsZ3/Request.png" alt="Request" border="0"></a>

The request page is where a customer finalizes their appointment request, inserting first and last name, a phone number and email, and any other notes they have regarding the appointment. From here, the user may either click 'request' to send the appointment info to the stylist of choice, or select 'back' to return to the booking page. In addition, the service price summary will be displayed on the right hand side of the page.

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/vQHgbxF/Thanks.png" alt="Thanks" border="0"></a>

After the request has been sent, a user will be shown this brief thank you popup with a handful of helpful details including contact information.

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/VLVv4Dc/Signup.png" alt="Signup" border="0"></a>

The signup page allows users that have not yet registered an account to create one. By entering name, number, email, and a password of their choosing, the user will be allowed to create an account after agreeing to the terms of service, and optionally marking themselves as a stylist if they are an employee.

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/DCBTpVx/Login.png" alt="Login" border="0"></a>

The login page is similar to many of its kind, simply requesting an email and password before being granted access to their account if the login is authorized successfully. In addition, a user may check the 'remember me' box to have the site remember their login details. In addition, the user may select 'forgot password' to enter the password reset page.

<a href="https://ibb.co/album/DGKxNV"><img src="https://i.ibb.co/2g07S8R/Password-Reset.png" alt="PasswordReset" border="0"></a>

On the password reset page, a user may enter their email, after which they will receive a link via that email to be assigned a new password. After resetting their password, they may proceed to the login page as normal.

<a href="https://ibb.co/nr9RQJp"><img src="https://i.ibb.co/F62n8Tp/Admin-Dashboard.png" alt="Admin-Dashboard" border="0" /></a>

When one of the stylists logs into the website they will be brought to this dashboard first. The dashboard displays all of the scheduled appointments of that stylist.

<a href="https://ibb.co/4Wvryvq"><img src="https://i.ibb.co/Zd4Ds4j/Admin-Settings.png" alt="Admin-Settings" border="0" /></a>

If a stylist goes into the settings page it will first display the profile of the stylist.

<a href="https://ibb.co/qF1D5sV"><img src="https://i.ibb.co/PzCrQh0/Removing-Or-Adding-Stylists.png" alt="Removing-Or-Adding-Stylists" border="0" /></a>

On the settings page there is a subpage where there is an option to add or remove stylists to the website.

<a href="https://ibb.co/6mCsQgy"><img src="https://i.ibb.co/W6JKCgH/Add-Or-Remove-Service.png" alt="Add-Or-Remove-Service" border="0" /></a>

There is another subpage on the settings page where services can be added or removed from the website.

<a href="https://ibb.co/Yp4sZkZ"><img src="https://i.ibb.co/xJKTHjH/Admin-Request-Acception-Or-Rejection-Or-Rebooking.png" alt="Admin-Request-Acception-Or-Rejection-Or-Rebooking" border="0" /></a>

In the admin view there is one more page that is available called "Requests". This is the page where a stylist recieves booking requests from customers that they can then choose to accept, reject, or rebook an appointment request.

<div align="right"> <a href="#team-entrecodeurs-csc-senior-project">Back to top</a> </div>

### Database

Database Layout

<a href="https://ibb.co/RBX6sBS"><img src="https://i.ibb.co/ZYQgFYJ/ERD.jpg" alt="ERD" border="0" /></a>

<div align="right"> <a href="#team-entrecodeurs-csc-senior-project">Back to top</a> </div>

## Deploying the Software

Required Technologies
- npm
```

git clone git@github.com:acn916/Senior-Project.git

cd Senior-Project/frontend/fresh-cuts

npm install

npm run build
```


[A build file should be created in the fresh-cuts directory]

For MacOS:
```
zip -r build.zip build
```

For Windows:
```
Compress-Archive -Path .\Senior-Project\frontend\fresh-cuts\build -DestinationPath .\Senior-Project\frontend\fresh-cuts\build.zip
```
This will create a build file containing all the required javascript, html, css and images needed for deployment.

Depending on what hosting website you would like to use:

Import the build.zip file and extract its contents into the public_html directory

Done!

<div align="right"> <a href="#team-entrecodeurs-csc-senior-project">Back to top</a> </div>

## Testing
Jest tests are named *.test.js. Each test will be found in the directory of the component they are testing.
```
npm install --save-dev @testing-library/react @testing-library/jest-dom axios-mock-adapter

cd Senior-Project/front-end/fresh-cuts

npm test
```
In the package.json file, find the “scripts” section, then locate “test” in the “scripts” section and modify it to the following:
```
"test": "react-scripts test --transformIgnorePatterns 'node_modules/(?!axios)/'"
```

## Team Members

- [Andrew Desrochers](mailto:andrewdesrochers@csus.edu)
- [Austin Nguyen](mailto:austinnguyen3@csus.edu)
- [Benjamin Tran Vo](mailto:benjamintranvo@csus.edu)
- [Brandon Dam](mailto:bdam@csus.edu)
- [Laura Kay](mailto:laurakay2@csus.edu)
- [Michael Tang](mailto:mtang@csus.edu) 
- [Nikita Cherepanov](mailto:ncherepanov@csus.edu)
- [Vivian Nguyen](mailto:viviannguyen5@csus.edu)

<div align="right"> <a href="#team-entrecodeurs-csc-senior-project">Back to top</a> </div>

## Contact

If you have any questions or need further clarification, feel free to reach out to any of the team members.

<div align="right"> <a href="#team-entrecodeurs-csc-senior-project">Back to top</a> </div>

## Contributing

Please note that unsolicited pull requests are not allowed for this repository. 

<div align="right"> <a href="#team-entrecodeurs-csc-senior-project">Back to top</a> </div>
