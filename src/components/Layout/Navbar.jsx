import { AppBar, Container, Toolbar, Box } from '@mui/material';
import React from 'react';

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
					<Box>navbar content</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
