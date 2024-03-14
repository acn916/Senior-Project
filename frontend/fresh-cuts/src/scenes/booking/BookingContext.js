import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    
    const [clientID, setClientID] = useState("");
    const [staffID, setStaffID] = useState("");
    const [serviceID, setServiceID] = useState("");
    const [scheduledAt, setScheduledAt] = useState("");
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");
    const [confirmationTimeStamp, setConfirmationTimeStamp] = useState("");
    const [cancellationReason, setCancellationReason] = useState("");
    
    return (
        <BookingContext.Provider 
            value={{
                clientID, 
                staffID, 
                serviceID, 
                scheduledAt, 
                status, 
                notes,
                confirmationTimeStamp,
                cancellationReason,
                setClientID,
                setStaffID,
                setServiceID,
                setScheduledAt,
                setStatus,
                setNotes,
                setConfirmationTimeStamp,
                setCancellationReason,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
