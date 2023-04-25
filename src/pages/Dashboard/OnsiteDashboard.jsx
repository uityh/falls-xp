/* eslint-disable no-alert */
import React, { useState, useEffect, useCallback } from 'react';
import { getProjectsByStatus } from 'utils/data/projects';
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
	Stack,
} from '@mui/material';
import { Launch } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function OnsiteDashboard({ user }) {
	const [projects, setProjects] = useState([]);
	const navigate = useNavigate();
	const getProjects = useCallback(async () => {
		const allProjects = await getProjectsByStatus('initial inspection');
		setProjects(allProjects);
	}, []);
	useEffect(() => {
		getProjects();
	}, [getProjects]);
	const headers = ['Customer', 'Address', 'Contact', 'Email', 'Action'];
	return (
		<Box>
			<Typography variant="h4" component="h1">
				Onsite Team Dashboard
			</Typography>
			<Divider sx={{ mb: 5, mt: 1 }} />
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
					{projects.map((project) => (
						<TableRow key={project.id}>
							<TableCell>
								{project.customer?.firstName || ''}{' '}
								{project.customer?.lastName || ''}
							</TableCell>
							<TableCell>{project.address}</TableCell>
							<TableCell>{project.customer?.phone || ''}</TableCell>
							<TableCell>{project.customer?.email || ''}</TableCell>
							<TableCell>
								{user?.role === 'field' ? (
									<Stack alignItems="flex-end">
										<Button
											variant="outlined"
											onClick={() => {
												navigate(`/photo-upload/${project.id}`);
											}}
											endIcon={<Launch />}
										>
											Inspect
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

export default OnsiteDashboard;
