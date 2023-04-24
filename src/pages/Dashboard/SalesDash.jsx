import { Launch } from '@mui/icons-material';
import {
	Box,
	Divider,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
	Stack,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjectsForSales } from 'utils/data/projects';

const headers = [
	'Customer Name',
	'Address',
	'Contact',
	'E-Mail',
	'Status',
	'Action',
];

function SalesDashboard({ user }) {
	const navigate = useNavigate();
	const [projects, setProjects] = useState([]);
	const getProjects = useCallback(async () => {
		const allProjects = await getProjectsForSales();
		setProjects(allProjects);
	}, []);
	useEffect(() => {
		getProjects();
	}, [getProjects]);
	return (
		<Box>
			<Typography variant="h4" component="h1">
				Sales Team Dashboard
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
							<TableCell>{project.status}</TableCell>
							<TableCell>
								{user?.role === 'sales' ? (
									<Stack alignItems="flex-end">
										<Button
											variant="outlined"
											onClick={() => {
												// navigate(`/review/${project.id}`);
												navigate(`/project/${project.id}`);
											}}
											endIcon={<Launch />}
										>
											Review
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

export default SalesDashboard;
