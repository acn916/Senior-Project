CREATE TABLE User_Profile (
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    cognito_id VARCHAR(255),
    total_spent DECIMAL(10,2),
    hours DECIMAL(10,2),
    no_of_emps INT,
    client_flag BOOL DEFAULT FALSE,
    staff_flag BOOL DEFAULT FALSE,
    admin_flag BOOL DEFAULT FALSE,
    
    PRIMARY KEY(id),
    UNIQUE(email),
    UNIQUE(cognito_id)
);

CREATE TABLE Service (
	
    id INTEGER auto_increment NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(500) NOT NULL,
    duration TIME NOT NULL,
    price decimal(10,2) NOT NULL,
    
    PRIMARY KEY(id)

);

CREATE TABLE Appointment (

	id INTEGER auto_increment NOT NULL,
    service_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    staff_id INTEGER NOT NULL,
    notes varchar(500) NOT NULL,
    scheduled_at DATETIME NOT NULL,
    status varchar(255) NOT NULL,
    confirmation_timestamp DATETIME,
    cancellation_reason varchar(255),
    
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES User_Profile(id),
    FOREIGN KEY (staff_id) REFERENCES User_Profile(id),
    FOREIGN KEY (service_id) REFERENCES Service(id),
    
    CHECK (status IN ('Pending', 'Confirmed', 'Cancelled', 'No-Show'))

);

CREATE TABLE Staff_Service (
	
    service_id INTEGER NOT NULL,
    staff_id INTEGER NOT NULL,
    
    PRIMARY KEY (service_id, staff_id),
    FOREIGN KEY (service_id) REFERENCES Service(id),
    FOREIGN KEY (staff_id) REFERENCES User_Profile(id)

);

CREATE VIEW User AS (
	SELECT email, id, first_name, last_name, cognito_id
	FROM User_Profile
);

CREATE VIEW Client AS (
	SELECT email, id, first_name, last_name, cognito_id, total_spent
	FROM User_Profile
	WHERE client_flag = True

);

CREATE VIEW Staff AS (

	SELECT email, id, first_name, last_name, cognito_id, hours
	FROM User_Profile
	WHERE staff_flag = True

);

CREATE VIEW Admin AS (
	SELECT email, id, first_name, last_name, cognito_id, no_of_emps
	FROM User_Profile
	WHERE admin_flag = True

);




