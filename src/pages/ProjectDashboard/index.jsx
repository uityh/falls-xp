import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects } from 'utils/data/projects';

function ProjectDashboard() {
	const navigate = useNavigate();
	const [projects, setProjects] = useState([]);
	const getProjects = useCallback(async () => {
		const allProjects = await getAllProjects();
		setProjects(allProjects);
	}, []);
	useEffect(() => {
		getProjects();
	}, [getProjects]);
	const headers = ['Customer ID', 'Address', 'Start Date', 'Status'];
	return (
		<Box>
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
					{projects.map((project) => (
						<TableRow
							key={project.id}
							onClick={() => {
								navigate(`/project-dashboard/${project.id}`);
							}}
							sx={{ cursor: 'pointer' }}
						>
							<TableCell>{project.customerId}</TableCell>
							<TableCell>{project.address}</TableCell>
							<TableCell>{project.startDate.toDate().toDateString()}</TableCell>
							<TableCell>{project.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
}

export default ProjectDashboard;
