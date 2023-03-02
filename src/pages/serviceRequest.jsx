import React from 'react';

export default function serviceRequest() {
    const submitRequest = () => {
        //Call firebase functions here
    }

    return (
        <div className="submit-service-request">
            <link rel="stylesheet" href="/src/styles/globals.css"/>
            <h1>Service Request</h1>
            <form onSubmit={submitRequest}>
                <label for="customerId" >Customer ID</label>
                <input type="text" name="customerId" id="customerId" placeholder="Customer ID"/>
                <br></br>
                <label for="address">Address</label>
                <input type="text" name="address" id="address" placeholder="Address"/>
                <br></br>
                <label for="startDate">Start Date</label>
                <input type="date" name="startDate" id="startDate"/>
                <br></br>
                <input type="text" name="description" id="description" placeholder="Enter a description"/>
            </form>
        </div>
    )
}