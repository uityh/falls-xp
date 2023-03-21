import { AppBar, Container, Toolbar, Box, Stack } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
	return (
		<AppBar
			sx={{
				backgroundColor: 'rgba(255,255,255,0.8)',
				backdropFilter: 'blur(20px)',
				color: 'black',
			}}
			position="sticky"
		>
			<Container>
				<Toolbar disableGutters>
					<Box sx={{ mr: 2 }}>Falls XP</Box>
					<Stack gap={2} direction="row">
						<NavLink to="/">Home</NavLink>
						<NavLink to="/sign-in">Sign In</NavLink>
						<NavLink to="/sign-up">Sign Up</NavLink>
						<NavLink to="/users">Users</NavLink>
						<NavLink to="/customer-leads">Customer Leads</NavLink>
						<NavLink to="/service-request">Service Request</NavLink>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
