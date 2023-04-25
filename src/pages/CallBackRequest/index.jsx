/* eslint-disable */
import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useAuthContext } from 'contexts/Auth';

function CallBackRequest() {

	const { user } = useAuthContext();
	console.log(user);
	const [phone, setPhone] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [notes, setNotes] = useState('');

	const handleCallBackSubmit = () => {
		// Submit call back request to backend
	}

	if(user === null) { 
		return( 
			<div>
				<Typography>You are not logged in.</Typography>
				<Link to="/sign-in">Sign In</Link>
			</div>
		);
	}
	
	if(user.role !== 'customer' && user.role !== 'admin') { 
		return(
			<div>
				<Typography>Only customers can request customer care appointments!</Typography>
			</div>
		);
	}

	return (
		<Box gap={2} sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', maxWidth: '50%' }} >
				<Typography variant="h4">Call Back Request</Typography>
				<TextField 
					id="phone" 
					label="Phone Number" 
					required 
					onChange={(e) => { 
  						e.currentTarget.value = e.target.value.replace(/[^0-9]/g, '')
						if(e.currentTarget.value.length < 10) { 
							setPhone(e.target.value)
						}
					}}
				/>

				<TextField
					id="date"
					label="Preferred Date"
					type="date"
					InputLabelProps={{
						shrink: true
					}}
					required
					onChange={(e) => { setDate(e.target.value) }}
				/>

				<TextField
					id="time"
					label="Preferred Time"
					type="time"
					InputLabelProps={{
						shrink: true
					}}
					inputProps={{
						step: 300
					}}
					required
					onChange={(e) => { setTime(e.target.value) }}
				/>

				<TextField
					id="notes"
					label="Notes"
					type="text"
					InputLabelProps={{
						shrink: true
					}}
					multiline
					required
					onChange={(e) => { setNotes(e.target.value) }}
				/>

				<Button
					variant="contained"
					type="submit"
					sx={{ alignSelf: 'flex-end' }}
				>
					Submit Request
				</Button>
		</Box>
	);
}

export default CallBackRequest;
