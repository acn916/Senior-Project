CREATE TABLE USER_PROFILE (
	
    UserID int AUTO_INCREMENT,
    First_Name varchar(255),
    Last_Name varchar(255),
    Email varchar(255),
    Phone varchar(255),
    UserRole varchar(255),

    PRIMARY KEY(UserID)
);

CREATE TABLE SERVICE (
	ServiceID INT AUTO_INCREMENT,
    ServiceName varchar(255),
    ServiceDescription varchar(255),
    ServiceDuration INT,
    Price INT,
    
    PRIMARY KEY(ServiceID)
);

CREATE TABLE STAFF_SERVICE (
	
    StaffServiceID INT AUTO_INCREMENT,
	UserID INT NOT NULL,
    ServiceID INT NOT NULL,
    
    PRIMARY KEY(StaffServiceID),
    FOREIGN KEY (UserID) REFERENCES USER_PROFILE(UserID),
    FOREIGN KEY (ServiceID) REFERENCES SERVICE(ServiceID)
    
);

CREATE TABLE APPOINTMENT (
	
    AppointmentID INT AUTO_INCREMENT,
    ClientID INT NOT NULL,
    StaffID INT NOT NULL,
    ServiceID INT NOT NULL,
    AppointmentTime varchar(255),
    AppointmentStatus varchar(255),
    AppointmentDate varchar(255),
    Notes varchar(255),
    ConfirmationTimeStamp varchar(255),
    CancelationReason varchar(255),
    
    
    PRIMARY KEY(AppointmentID),
    FOREIGN KEY(ClientID) REFERENCES USER_PROFILE(UserID),
    FOREIGN KEY(StaffID) REFERENCES USER_PROFILE(UserID),
    FOREIGN KEY(ServiceID) REFERENCES SERVICE(ServiceID)

);

CREATE TABLE USER_AUTH (

	UserAuthID INT AUTO_INCREMENT,
    UserID INT NOT NULL,
    PassHash varchar(255),
    Pass_Reset_Token_Expiration varchar(255),
    Pass_Reset_Token_Expiration_Date varchar(255),
    Password_Reset_Token varchar(255),
    
    PRIMARY KEY(UserAuthID),
    FOREIGN KEY(UserID) REFERENCES USER_PROFILE(UserID)
 
);

