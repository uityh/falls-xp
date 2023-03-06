import React from 'react';

export default function ServiceRequest() {
	const submitRequest = () => {
		// Call firebase functions here
	};

	return (
		<div className="submit-service-request">
			<h1>Service Request</h1>
			<form onSubmit={submitRequest}>
				<label htmlFor="customerId">
					Customer ID
					<input
						type="text"
						name="customerId"
						id="customerId"
						placeholder="Customer ID"
					/>
				</label>
				<br />
				<label htmlFor="address">
					Address
					<input
						type="text"
						name="address"
						id="address"
						placeholder="Address"
					/>
				</label>
				<br />
				<label htmlFor="startDate">
					Start Date
					<input type="date" name="startDate" id="startDate" />
				</label>
				<br />
				<input
					type="text"
					name="description"
					id="description"
					placeholder="Enter a description"
				/>
			</form>
		</div>
	);
}
