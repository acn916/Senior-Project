DELIMITER $

CREATE FUNCTION has_email(email_param VARCHAR(255)) RETURNS BOOLEAN
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE email_count INT;

    SELECT COUNT(*) INTO email_count
    FROM User_Profile
    WHERE email = email_param;

    IF email_count > 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END$

DELIMITER ;
