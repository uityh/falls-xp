import React, { useCallback, useEffect, useState } from 'react';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { getAllProjects } from 'utils/data/projects';

export default function OnsiteDash(user) {
	const [projects, setProjects] = useState([]);
	const getUsers = useCallback(async () => {
		const allProjects = await getAllProjects();
		setProjects(allProjects);
	}, []);
	useEffect(() => {
		getUsers();
	}, [getUsers]);
	const headers = [
		'CustomerId',
		'Status',
		'Address',
		'Start Date',
		'Customer Notes',
		'Tasks',
		'Assigned To',
		'Action Required',
	];
	return (
		<Box>
			<Typography>Dashboard | Onsite Team</Typography>
			<Typography>
				Current User: {user?.firstName ?? 'Not Logged in'}
			</Typography>
			<Typography> Role: {user?.role}</Typography>

			<Table sx={{ p: 2 }}>
				<TableHead>
					<TableRow>
						{headers.map((headCell) => (
							<TableCell key={headCell} sx={{ fontWeight: 'bold' }}>
								{headCell}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{projects.map((object) => (
						<TableRow key={object.id}>
							<TableCell>{object.customerId}</TableCell>
							<TableCell>{object.status}</TableCell>
							<TableCell>{object.address}</TableCell>
							<TableCell>Dev: Date not working</TableCell>
							{/* Date below isn't working */}
							{/* <TableCell>{object.startDate.toDate()}</TableCell> */}
							<TableCell>{object.customerNotes}</TableCell>
							<TableCell>{object.tasks.join(', ')}</TableCell>

							<TableCell>{object.assignedWorkers.join(', ')}</TableCell>
							<TableCell>
								{object.assignedWorkers.includes(user?.id) ? 'Yes' : 'No'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
}
