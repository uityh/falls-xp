import { Box, Typography } from '@mui/material';
import { useAuthContext } from 'contexts/Auth';
import React from 'react';

export default function Home() {
	const { user } = useAuthContext();
	return (
		<Box>
			<Typography>Home Page</Typography>
			<Typography>
				Current User: {user?.firstName ?? 'Not Logged In'}
			</Typography>
			{user && <Typography>Role: {user?.role}</Typography>}
		</Box>
	);
}
