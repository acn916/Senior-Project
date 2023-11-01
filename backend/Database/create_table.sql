CREATE TABLE User_Profile (
    id INT AUTO_INCREMENT NOT NULL,
    cognito_user_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_role VARCHAR(20) NOT NULL,

    PRIMARY KEY(id),
    UNIQUE (email),
    UNIQUE (cognito_user_id),

    CHECK (user_role IN ('Client', 'Staff', 'Admin'))
);

CREATE TABLE Service (
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    duration TIME NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    
    PRIMARY KEY(id)
);

CREATE TABLE Staff_Service (
    staff_id INT NOT NULL,
	service_id INT NOT NULL,

    PRIMARY KEY(staff_id, service_id),
    FOREIGN KEY (staff_id) REFERENCES User_Profile(id),
    FOREIGN KEY (service_id) REFERENCES Service(id)
    
);

CREATE TABLE Appointment (
    id INT AUTO_INCREMENT NOT NULL,
    client_id INT NOT NULL,
    staff_id INT NOT NULL,
    service_id INT NOT NULL,
    scheduled_at DATETIME NOT NULL,
    status VARCHAR(255) NOT NULL,
    notes VARCHAR(500),
    confirmation_timestamp DATETIME,
    cancellation_reason VARCHAR(255),
    
    PRIMARY KEY(id),
    FOREIGN KEY(client_id) REFERENCES User_Profile(id),
    FOREIGN KEY(staff_id) REFERENCES User_Profile(id),
    FOREIGN KEY(service_id) REFERENCES Service(id),

    CHECK (status IN ('Pending', 'Confirmed', 'Cancelled', 'No-Show'))
);

CREATE TABLE Staff_Availability (
    staff_id INT NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME Not NULL,

    PRIMARY KEY(staff_id, start, end),
    FOREIGN KEY(staff_id) REFERENCES User_Profile(id)
);