import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	Button,
} from '@mui/material';
import { getAllProjects } from 'utils/data/projects';

export default function AdminDash({ user, header }) {
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
			<Typography variant="h4" component="h1">
				{header}
			</Typography>
			<Divider sx={{ mb: 5, mt: 1 }} />
			<Table>
				<TableHead>
					<TableRow>
						{headers.map((headCell) => (
							<TableCell key={headCell} sx={{ fontWeight: 'bold' }}>
								{headCell}
							</TableCell>
						))}
						<TableCell>View Project</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{projects.map((object) => (
						<TableRow key={object.id}>
							<TableCell>{object.customerId}</TableCell>
							<TableCell>{object.status}</TableCell>
							<TableCell>{object.address}</TableCell>
							<TableCell>
								{new Date(object.startDate.seconds * 1000).toDateString()}
							</TableCell>
							<TableCell>{object.customerNotes}</TableCell>
							<TableCell>
								{object.tasks?.map((task) => {
									if (task.name && task.name?.length !== 0) {
										return (
											<div>
												<p>{task.name}, </p>
											</div>
										);
									}
									return (
										<div>
											<p>No Name Provided </p>
										</div>
									);
								})}
							</TableCell>
							<TableCell>{object.assignedWorkers?.join(', ')}</TableCell>
							<TableCell>
								{object.assignedWorkers?.includes(user?.id) ? 'Yes' : 'No'}
							</TableCell>
							<TableCell>
								<Link to={`/project/${object.id}`}>
									<Button variant="contained">View Project</Button>
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
}
