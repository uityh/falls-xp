import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Customer = [];

function tableDisplay() {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>NAME</TableCell>
						<TableCell align="right">EMAIL</TableCell>
						<TableCell align="right">PASSWORD</TableCell>
						<TableCell align="right">CARD NUMBER</TableCell>
						<TableCell align="right">SECURE CODE</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Customer.map((cust) => (
						<TableRow
							key={cust.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{cust.name}
							</TableCell>
							<TableCell align="right">{cust.email}</TableCell>
							<TableCell align="right">{cust.password}</TableCell>
							<TableCell align="right">{cust.billingInfo.cardNum}</TableCell>
							<TableCell align="right">{cust.billingInfo.secureCode}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default tableDisplay;
