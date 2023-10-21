# Team Entrecodeurs CSC Senior Project

This repository contains the codebase for an online scheduling system designed for beauty salons. To schedule appointments, the system allows clients to select their preferred service, choose a stylist, and pick a date of their choosing. The system allows stylists to set their schedule and whether or not to approve or disapprove an appointment.

## Repository Structure

This repository consists of two main directories:

- `frontend/` - Contains the ReactJS code for the client-facing part of the application.
- `backend/` - Contains the code for the server-side part of the application.

## Project Architecture

### Frontend

Our frontend is constructed using ReactJS, an efficient and flexible JavaScript library. The frontend assets are hosted and served using Amazon S3, an AWS service renowned for its scalability and robustness.

### Backend

The backend architecture is serverless, built around AWS services. It's exposed through the AWS API Gateway, which triggers events to AWS Lambda. Our Lambda functions are written in Python, providing a responsive and efficient service. The database is handled by AWS Aurora, a cloud-based relational database service compatible with MySQL. This architecture ensures scalability, maintainability, and resilience.

## Contributing

Please note that unsolicited pull requests are not allowed for this repository. 

## Team Members

- [Andrew Desrochers](mailto:andrewdesrochers@csus.edu)
- [Austin Nguyen](mailto:austinnguyen3@csus.edu)
- [Benjamin Tran Vo](mailto:benjamintranvo@csus.edu)
- [Brandon Dam](mailto:bdam@csus.edu)
- [Laura Kay](mailto:laurakay2@csus.edu)
- [Michael Tang](mailto:mtang@csus.edu) 
- [Your Name] NC
- [Vivian Nguyen](mailto:viviannguyen5@csus.edu)

## Contact

If you have any questions or need further clarification, feel free to reach out to any of the team members.
