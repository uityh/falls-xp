/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import {
	TextField,
	Button,
	Typography,
	Select,
	MenuItem,
	InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from 'contexts/Auth';
import { createServiceRequest } from 'utils/data/ServiceRequest';
import { getUserById, getUsersByRole } from 'utils/data/users';

export default function ServiceRequest() {
	const { user } = useAuthContext();
	const [onsiteUsers, setOnsiteUsers] = useState([]);
	const [selectedOnsiteUser, setSelectedOnsiteUser] = useState(null);

	useEffect(() => {
		const fetchOnsiteUsers = async () => {
			const users = await getUsersByRole('onsite');
			setOnsiteUsers(users);
			users.length
				? setSelectedOnsiteUser(users[0].id)
				: setSelectedOnsiteUser(null);
		};
		fetchOnsiteUsers();
	}, []);

	const submitRequest = async (e) => {
		e.preventDefault();
		try {
			if (user === null) {
				throw new Error('You must be logged in to submit a Service Request');
			}
			const customer = await getUserById(e.target.elements.customerId.value);
			if (customer.role !== 'customer') {
				console.log('Error from frontend');
				throw new Error('That is not a real customer!');
			}
			await createServiceRequest(
				e.target.elements.customerId.value,
				user.id,
				e.target.elements.address.value,
				e.target.elements.startDate.value,
				e.target.elements.description.value,
				selectedOnsiteUser
			);
			document.getElementById('service-request-form').reset();
			document.getElementById('error-field').innerHTML = '';
			document.getElementById('success-field').innerHTML =
				'<h2>Service Request successfully added!</h2>';
		} catch (error) {
			document.getElementById(
				'error-field'
			).innerHTML = `<h2>Error: ${error.message}</h2>`;
			document.getElementById('success-field').innerHTML = '';
		}
	};
	if (user === null) {
		return (
			<div>
				<Typography>You are not logged in.</Typography>
				<Link to="/sign-in">Sign In</Link>
			</div>
		);
	}
	if (onsiteUsers.length === 0) {
		return (
			<div>
				<Typography>No onsite users found. Please wait.</Typography>
			</div>
		);
	}
	if (user.role === 'sales' || user.role === 'admin') {
		return (
			<div className="submit-service-request">
				<h1 className="page-header">Service Request</h1>
				<form id="service-request-form" onSubmit={submitRequest}>
					<TextField
						id="customerId"
						label="Customer ID"
						variant="filled"
						required
						size="small"
						margin="dense"
						helperText="Enter the customer's ID"
					/>
					<br />
					<TextField
						id="address"
						label="Address"
						variant="filled"
						required
						size="small"
						margin="dense"
						helperText="Enter the customer's address"
					/>
					<br />
					<TextField
						id="startDate"
						label="Start Date"
						variant="filled"
						type="date"
						size="small"
						margin="dense"
						required
						InputLabelProps={{ shrink: true }}
					/>
					<br />
					<TextField
						id="description"
						label="Description"
						variant="filled"
						margin="dense"
						multiline
						placeholder="Enter a Description"
					/>
					<br />
					<InputLabel id="onsiteUserLabel">Onsite Employee</InputLabel>
					<Select
						id="onsiteUser"
						labelId="onsiteUserLabel"
						variant="filled"
						size="small"
						value={selectedOnsiteUser}
						required
						onChange={(e) => {
							setSelectedOnsiteUser(e.target.value);
						}}
					>
						{onsiteUsers.map((user) => {
							return (
								<MenuItem key={user.id} value={user.id}>
									{user.firstName} {user.lastName}
								</MenuItem>
							);
						})}
					</Select>
					<br />
					<br />
					<Button
						variant="contained"
						type="submit"
						margin="dense"
						sx={{
							color: 'black',
							backgroundColor: 'lightgrey',
							borderColor: 'black',
							borderRadius: '20px',
						}}
					>
						Submit Request
					</Button>
				</form>
				<div id="error-field" className="error-field" />
				<div id="success-field" className="success-field" />
			</div>
		);
	}
	return (
		<div>
			<Typography>
				You are not a sales user. You do not have access to this page
			</Typography>
			<Link to="/">Return Home</Link>
		</div>
	);
}
