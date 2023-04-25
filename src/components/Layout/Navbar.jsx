/* eslint-disable no-console */
import { AppBar, Container, Toolbar, Stack, Button } from '@mui/material';
import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/Auth';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';
import { Logout } from '@mui/icons-material';
import Logo from './Logo.png';

const paths = {
	users: {
		label: 'Users',
		path: '/users',
	},
	leads: {
		label: 'Customer Leads',
		path: '/customer-leads',
	},
	// serviceRequest: {
	// 	label: 'Service Request',
	// 	path: '/service-request',
	// },
	// viewProjects: {
	// 	label: 'View your Projects',
	// 	path: '/project-views',
	// },
	dashboard: {
		label: 'Dashboard',
		path: '/dashboard',
	},
	// projectsDashboard: {
	// 	label: 'Project Dashboard',
	// 	path: '/project-dashboard',
	// },
};

function Navbar() {
	const { user, refreshAuthState } = useAuthContext();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const handleSignOut = async () => {
		try {
			await signOut(auth);
			await refreshAuthState();
		} catch (e) {
			console.error(e);
		}
	};

	const navItems = useMemo(() => {
		let items = [];
		if (user?.role === 'admin') items = Object.values(paths);
		else if (user?.role) {
			if (user?.role === 'sales') items.push(paths.leads);
			if (user.role !== 'customer') items.push(paths.dashboard);
		}
		return items || [];
	}, [user?.role]);
	return (
		<AppBar
			sx={{
				backgroundColor: 'rgba(255,255,255,0.8)',
				backdropFilter: 'blur(20px)',
			}}
			position="sticky"
		>
			<Container>
				<Toolbar disableGutters>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						width="100%"
					>
						<Link
							to="/dashboard"
							style={{
								height: '3rem',
							}}
						>
							<img
								src={Logo}
								alt="Falls XP"
								style={{
									height: '100%',
									width: 'auto',
								}}
							/>
						</Link>
						<Stack gap={2} direction="row" sx={{ minHeight: 64 }}>
							{navItems.map((item) => (
								<Button
									key={item.path}
									onClick={() => {
										navigate(item.path);
									}}
									sx={{
										py: 2,
										display: 'block',
										borderRadius: 0,
										color: 'black',
										'&:disabled': {
											borderTop: (theme) =>
												`3px solid ${theme.palette.primary.main}`,
											color: (theme) => theme.palette.primary.main,
											pt: '13px',
										},
									}}
									disabled={Boolean(pathname === item.path)}
								>
									{item.label}
								</Button>
							))}
						</Stack>
						{user === null ? (
							<Button
								variant="contained"
								onClick={() => {
									navigate('/sign-in');
								}}
							>
								Sign In
							</Button>
						) : (
							<Button
								variant="outlined"
								onClick={handleSignOut}
								startIcon={<Logout />}
							>
								Sign Out
							</Button>
						)}
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
