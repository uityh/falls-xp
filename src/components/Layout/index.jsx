import { Container } from '@mui/material';
import { useAuthContext } from 'contexts/Auth';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ children }) {
	const { appInitialized } = useAuthContext();

	// TODO: replace with a full screen loader
	if (!appInitialized) return <Container>Loading</Container>;

	return (
		<Router>
			<Navbar />
			<Container sx={{ py: 4 }}>{children}</Container>
		</Router>
	);
}

export default Layout;
