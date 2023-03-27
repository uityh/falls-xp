/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
} from '@mui/material';
import { useAuthContext } from 'contexts/Auth';
import { getProjectByInvolvedId } from 'utils/data/projects';

export default function ProjectViews() {
	const { user } = useAuthContext();
	const [involvedProjects, setInvolvedProjects] = useState([]);
	const getProjects = useCallback(async () => {
		if (user !== null) {
			const userProjects = await getProjectByInvolvedId(user.id);
			setInvolvedProjects(userProjects);
		}
	}, [user]);
	useEffect(() => {
		getProjects();
	}, [getProjects]);
	let headers = [];
	if (user !== null) {
		if (user.role === 'admin') {
			// Gets all active projects
			// TODO: Put in a connection to view the pictures for each project
			headers = [
				'ID',
				'Tasks',
				'Status',
				'Address',
				'Cost',
				'Customer Notes',
				'Assigned Workers',
			];
			return (
				<div>
					<Typography className="body-text">
						Current User: {user.firstName}
					</Typography>
					<Typography className="body-text">Role: {user.role}</Typography>
					<Typography
						className="body-heading"
						sx={{ fontWeight: 'bold', fontSize: '22px' }}
					>
						Projects:{' '}
					</Typography>
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
							{involvedProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell>{project.id}</TableCell>
									<TableCell>{project.tasks}</TableCell>
									<TableCell>{project.status}</TableCell>
									<TableCell>{project.address}</TableCell>
									<TableCell>
										{project.cost === 0 ? 'TBD' : project.cost}
									</TableCell>
									<TableCell>{project.customerNotes}</TableCell>
									<TableCell>{project.assignedWorkers}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			);
		}
		if (user.role === 'operations') {
			// Gets any projects they are assigned to, shows relevant info and pictures
			// TODO: Put in a connection to view the pictures for each project
			headers = [
				'ID',
				'Tasks',
				'Status',
				'Address',
				'Cost',
				'Customer Notes',
				'Photos',
			];
			return (
				<div>
					<Typography className="body-text">
						Current User: {user.firstName}
					</Typography>
					<Typography className="body-text">Role: {user.role}</Typography>
					<Typography
						className="body-heading"
						sx={{ fontWeight: 'bold', fontSize: '22px' }}
					>
						Projects:{' '}
					</Typography>
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
							{involvedProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell>{project.id}</TableCell>
									<TableCell>{project.tasks}</TableCell>
									<TableCell>{project.status}</TableCell>
									<TableCell>{project.address}</TableCell>
									<TableCell>
										{project.cost === 0 ? 'TBD' : project.cost}
									</TableCell>
									<TableCell>{project.customerNotes}</TableCell>
									{project.tasks.includes('initial inspection') ? (
										<TableCell>
											<Link to={`/photo-review/${project.id}`}>
												<Button variant="contained">View Photos</Button>
											</Link>
										</TableCell>
									) : (
										<TableCell></TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			);
		}
		if (user.role === 'sales') {
			// Gets any projects they have been involved in starting, show sales analytic info
			headers = ['ID', 'Status', 'Address', 'Cost', 'Customer Notes'];
			return (
				<div>
					<Typography className="body-text">
						Current User: {user.firstName}
					</Typography>
					<Typography className="body-text">Role: {user.role}</Typography>
					<Typography
						className="body-heading"
						sx={{ fontWeight: 'bold', fontSize: '22px' }}
					>
						Projects:{' '}
					</Typography>
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
							{involvedProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell>{project.id}</TableCell>
									<TableCell>{project.status}</TableCell>
									<TableCell>{project.address}</TableCell>
									<TableCell>
										{project.cost === 0 ? 'TBD' : project.cost}
									</TableCell>
									<TableCell>{project.customerNotes}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			);
		}
		if (user.role === 'field') {
			// Gets projects they're assigned to, has relevant info and pictures
			// TODO: Put in a connection to view the pictures for each project
			headers = ['ID', 'Tasks', 'Status', 'Address', 'Customer Notes'];
			return (
				<div>
					<Typography className="body-text">
						Current User: {user.firstName}
					</Typography>
					<Typography className="body-text">Role: {user.role}</Typography>
					<Typography
						className="body-heading"
						sx={{ fontWeight: 'bold', fontSize: '22px' }}
					>
						Projects:{' '}
					</Typography>
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
							{involvedProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell>{project.id}</TableCell>
									<TableCell>{project.tasks}</TableCell>
									<TableCell>{project.status}</TableCell>
									<TableCell>{project.address}</TableCell>
									<TableCell>{project.customerNotes}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			);
		}
		if (user.role === 'customer') {
			// Shows projects they are customers of, shwos project progress
			headers = ['ID', 'Status', 'Address', 'Cost'];
			return (
				<div>
					<Typography className="body-text">
						Current User: {user.firstName}
					</Typography>
					<Typography className="body-text">Role: {user.role}</Typography>
					<Typography
						className="body-heading"
						sx={{ fontWeight: 'bold', fontSize: '22px' }}
					>
						Projects:{' '}
					</Typography>
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
							{involvedProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell>{project.id}</TableCell>
									<TableCell>{project.status}</TableCell>
									<TableCell>{project.address}</TableCell>
									<TableCell>
										{project.cost === 0 ? 'TBD' : project.cost}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			);
		}
	}
	return (
		<div>
			<Typography>Current User: Not logged in</Typography>
		</div>
	);
}
