import React from 'react';
import { createServiceRequest } from 'utils/data/ServiceRequest';
import { auth } from 'utils/firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function serviceRequest() {
    const submitRequest = (e) => {
        e.preventDefault();
		createServiceRequest(
			e.target.elements.customerId.value, 	// customerId
			auth.currentUser.uid,									// salesRepId; default for now
			e.target.elements.address.value, 		// address
			e.target.elements.startDate.value,		// startDate
			e.target.elements.description.value
		);
    }

    return (
        <div className="submit-service-request">
            <link rel="stylesheet" href="/src/styles/globals.css"/>
            <h1 className="page-header">Service Request</h1>
            <form onSubmit={submitRequest}>
                <TextField id="customerId" label="Customer ID" variant="filled" required size="small" margin="dense" helperText="Enter the customer's ID"/>
                <br/>
                <TextField id="address" label="Address" variant="filled" required size="small" margin="dense" helperText="Enter the customer's address"/>
                <br/>
                <TextField id="startDate" label="Start Date" variant="filled" type="date" size="small" margin="dense" required InputLabelProps={{shrink: true}}/>
                <br/>
                <TextField id="description" label="Description" variant="filled" margin="dense" multiline placeholder="Enter a Description"/>
                <br/>
                <Button variant="contained" type="submit" sx={{color: 'black', backgroundColor: "lightgrey", borderColor: 'black', borderRadius: '20px'}}>Submit Request</Button>
            </form>
        </div>
    )
}