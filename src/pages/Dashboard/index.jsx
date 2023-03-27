import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAuthContext } from 'contexts/Auth';
import AdminDash from './AdminDash';
import OnsiteDash from './OnsiteDash';
import OperationsDash from './OperationsDash';

function Dashboard() {
	const { user } = useAuthContext();

	if (user !== null) {
		if (user.role === 'admin') {
			return AdminDash(user);
		}
		if (user.role === 'operations') {
			return OperationsDash(user);
		}
		if (user.role === 'field') {
			return OnsiteDash(user);
		}
	}
	return (
		<Box>
			<Typography>Dashboard</Typography>
			<Typography>Not Logged In</Typography>
		</Box>
	);
}

export default Dashboard;
