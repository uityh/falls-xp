import React, { useCallback, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Stack,
	// Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	// Typography,
} from '@mui/material';
import { getProjectLeads } from 'utils/data/projects';
import { useAuthContext } from 'contexts/Auth';
// import CustomerData from './CustomerData';

const headers = ['Address', 'Customer', 'Contact', 'Action'];

function CustomerLeads() {
	const [leads, setLeads] = useState([]);
	const { user } = useAuthContext();
	const getLeads = useCallback(async () => {
		const allLeads = await getProjectLeads();
		setLeads(allLeads);
	}, []);
	useEffect(() => {
		getLeads();
	}, [getLeads]);
	return (
		<Box>
			{/* <Typography variant="h4" component="h1">
				Customer
			</Typography>
			<Divider sx={{ mb: 5, mt: 1 }} /> */}
			<Table>
				<TableHead>
					<TableRow>
						{headers.map((headCell, index) => (
							<TableCell
								key={headCell}
								sx={{ fontWeight: 'bold' }}
								align={index === headers.length - 1 ? 'right' : 'left'}
							>
								{headCell}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{leads.map((lead) => (
						<TableRow key={lead.id}>
							<TableCell>{lead.address}</TableCell>
							<TableCell>
								{lead.customer?.firstName || ''} {lead.customer?.lastName || ''}
							</TableCell>
							<TableCell>{lead.customer?.phone || ''}</TableCell>
							<TableCell>
								{user?.role === 'sales' ? (
									<Stack direction="row" gap={2} justifyContent="flex-end">
										<Button variant="outlined" color="error">
											Declined
										</Button>
										<Button variant="contained">
											Initiate Initial Inspection
										</Button>
									</Stack>
								) : (
									''
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
}

export default CustomerLeads;
