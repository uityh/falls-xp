/* eslint-disable */
import { Box, Button, Typography, TextField } from '@mui/material';

function AppointmentRequest() { 
	return(
		<Box>
			<Typography variant="h4">Call Back Request</Typography>
			<TextField
				id="phone"
				label="Phone Number"
				type="tel"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">+1</InputAdornment>
					)
				}}
				required
			/>

			<TextField
				id="date"
				label="Date"
				type="date"
				InputLabelProps={{
					shrink: true,
				}}
				required
			/>

			<TextField
				id="time"
				label="Time"
				type="time"
				InputLabelProps={{
					shrink: true,
				}}
				inputProps={{
					step: 300, // 5 min
				}}
				required
			/>

			<TextField
				id="notes"
				label="Notes"
				type="text"
				InputLabelProps={{
					shrink: true,
				}}
				required
			/>

			<Button
				variant="contained"
				type="submit"
				disabled={isSubmitting}
				sx={{ alignSelf: 'flex-end' }}
			>
				{isSubmitting ? <CircularProgress /> : 'Submit Request'}
			</Button>

		</Box>	
	)

};

export default AppointmentRequest;