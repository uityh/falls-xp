import { Container } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ children }) {
	return (
		<Router>
			<Navbar />
			<Container sx={{ py: 4 }}>{children}</Container>
		</Router>
	);
}

export default Layout;
