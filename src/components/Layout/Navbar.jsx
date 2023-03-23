import { AppBar, Container, Toolbar, Box, Stack } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
	return (
		<AppBar
			sx={{
				backgroundColor: 'darkblue',
				backdropFilter: 'blur(20px)',
			}}
			position="sticky"
		>
			<Container>
				<Toolbar disableGutters>
					<Box
						sx={{
							mr: 2,
							color: 'white',
							fontStyle: 'italic',
							fontSize: '22px',
						}}
					>
						Falls XP
					</Box>
					<Stack gap={2} direction="row">
						<NavLink
							to="/"
							style={({ isActive }) => {
								return {
									textDecoration: 'none',
									color: isActive ? 'orange' : 'white',
								};
							}}
						>
							Home
						</NavLink>
						<NavLink
							to="/sign-in"
							style={({ isActive }) => {
								return {
									textDecoration: 'none',
									color: isActive ? 'orange' : 'white',
								};
							}}
						>
							Sign In
						</NavLink>
						<NavLink
							to="/sign-up"
							style={({ isActive }) => {
								return {
									textDecoration: 'none',
									color: isActive ? 'orange' : 'white',
								};
							}}
						>
							Sign Up
						</NavLink>
						<NavLink
							to="/users"
							style={({ isActive }) => {
								return {
									textDecoration: 'none',
									color: isActive ? 'orange' : 'white',
								};
							}}
						>
							Users
						</NavLink>
						<NavLink
							to="/customer-leads"
							style={({ isActive }) => {
								return {
									textDecoration: 'none',
									color: isActive ? 'orange' : 'white',
								};
							}}
						>
							Customer Leads
						</NavLink>
						<NavLink
							to="/service-request"
							style={({ isActive }) => {
								return {
									textDecoration: 'none',
									color: isActive ? 'orange' : 'white',
								};
							}}
						>
							Service Request
						</NavLink>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
