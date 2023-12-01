# Team Entrecodeurs CSC Senior Project

<a href="https://ibb.co/xqMtdyc"><img src="https://i.ibb.co/5h5gwdz/Homepage.png" alt="Homepage" border="0"></a>

This repository contains the codebase for an online scheduling system designed for beauty salons. To schedule an appointment, the system allows clients to select from a list of available services, select one or more stylists, and pick a date that fits their schedule. From there, stylists can input their schedules, and select whether or not to accept or decline incoming appointment requests.

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

## Testing and Deployment

Awaiting further information.

## Application Views

<a href="https://ibb.co/8KjzYcL"><img src="https://i.ibb.co/HFrNhdf/Image1.png" alt="Image1" border="0"></a>

<a href="https://ibb.co/M7JbfZ2"><img src="https://i.ibb.co/w42T7B0/Image2.png" alt="Image2" border="0"></a>

<a href="https://imgbb.com/"><img src="https://i.ibb.co/0cfSFZT/Image3.png" alt="Image3" border="0"></a>

<a href="https://imgbb.com/"><img src="https://i.ibb.co/f0Fcc2H/Image4.png" alt="Image4" border="0"></a>

## Future Roadmap

Sprint 5 Goals
- [ ] All public facing pages should be completed
- [ ] Users will be able to login
- [ ] Clients will be able to change their password
- [ ] Clients will be able to schedule an appointment

Sprint 6 Goals
- [ ] Clients panel UI will be completed
- [ ] Stylists panel UI will be completed
- [ ] Admin panel UI will be completed
- [ ] Admin will be able to add new stylists
- [ ] Admin will be able to add new services

Sprint 7 Goals
- [ ] Stylists will be able to confirm or deny their appointments
- [ ] Clients will be able to cancel their appointments
- [ ] Private routing is completed

Sprint 8 Goals
- [ ] Clients will get a reminder SMS before their appointment
- [ ] Users will be able to delete their accounts

## Team Members

- [Andrew Desrochers](mailto:andrewdesrochers@csus.edu)
- [Austin Nguyen](mailto:austinnguyen3@csus.edu)
- [Benjamin Tran Vo](mailto:benjamintranvo@csus.edu)
- [Brandon Dam](mailto:bdam@csus.edu)
- [Laura Kay](mailto:laurakay2@csus.edu)
- [Michael Tang](mailto:mtang@csus.edu) 
- [Nikita Cherepanov](mailto:ncherepanov@csus.edu)
- [Vivian Nguyen](mailto:viviannguyen5@csus.edu)

## Contact

If you have any questions or need further clarification, feel free to reach out to any of the team members.
