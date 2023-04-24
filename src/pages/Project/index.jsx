/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	Box,
	Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { useAuthContext } from 'contexts/Auth';

import {
	addTaskToProject,
	checkProjectInvolvement,
	getProjectByProjectId,
} from '../../utils/data/projects';

function CircularProgressWithLabel(props) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress
				variant="determinate"
				size={75}
				sx={{ color: 'darkblue' }}
				{...props}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="caption"
					component="div"
					color="black"
					fontSize="20px"
				>
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}
CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 * @default 0
	 */
	value: PropTypes.number.isRequired,
};

export default function Project() {
	const { user } = useAuthContext();
	const { projectid } = useParams();
	const [loading, setLoading] = useState(true);
	const [thisProject, setThisProject] = useState(null);
	const [isInvolved, setIsInvolved] = useState(false);
	useEffect(() => {
		async function getProject() {
			if (user !== null) {
				const project = await getProjectByProjectId(projectid);
				setThisProject(project);
				const involved = await checkProjectInvolvement(projectid, user.id);
				setIsInvolved(involved);
				setLoading(false);
			}
		}
		getProject();
	}, [user, projectid]);
	const handleAddTask = async () => {
		await addTaskToProject('p7BU45bm7WUFWg3COThK', 'initial inspection', false);
	};
	if (user !== null) {
		if (loading) {
			return (
				<div>
					<Typography>Loading...</Typography>
				</div>
			);
		}
		if (!isInvolved) {
			return (
				<div>
					<Typography>
						Error: You are not authorized to view this project
					</Typography>
				</div>
			);
		}

		let card = (
			<List>
				<ListItem data-testid="id-item">
					<ListItemText primary={`Id: ${thisProject.id}`} />
				</ListItem>
				<ListItem data-testid="progress-item">
					<ListItemText primary="Progress: " />
				</ListItem>
				<ListItem>
					<CircularProgressWithLabel
						value={
							thisProject.tasks.length === 0
								? 0
								: (thisProject.tasks.length - 1) * 25
						}
					/>
				</ListItem>
				<ListItem>
					<ListItemText primary="Tasks: " />
				</ListItem>
				{thisProject.tasks.map((task) => {
					return (
						<List data-testid="task-item" component="div">
							<ListItem sx={{ pl: 6 }}>
								<ListItemText primary={`Task Name: ${task.taskName}`} />
							</ListItem>
							{user.role !== 'customer' ? (
								<ListItem sx={{ pl: 6 }}>
									<ListItemText primary={`Task Team: ${task.team}`} />
								</ListItem>
							) : (
								<ListItem />
							)}
							<ListItem sx={{ pl: 6 }}>
								<ListItemText
									primary={`Task Start Date: ${task.startDate
										.toDate()
										.toDateString()}`}
								/>
							</ListItem>
							<ListItem sx={{ pl: 6 }}>
								<ListItemText primary={`Task Status: ${task.status}`} />
							</ListItem>
						</List>
					);
				})}
				<ListItem data-testid="status-item">
					<ListItemText primary={`Status: ${thisProject.status}`} />
				</ListItem>
				<ListItem data-testid="address-item">
					<ListItemText primary={`Address: ${thisProject.address}`} />
				</ListItem>
				<ListItem data-testid="cost-item">
					<ListItemText primary={`Cost: ${thisProject.cost}`} />
				</ListItem>
				{user.role !== 'customer' ? (
					<ListItem data-testid="notes-item">
						<ListItemText
							primary={`Customer Notes: ${thisProject.customerNotes}`}
						/>
					</ListItem>
				) : (
					<ListItem />
				)}
				{user.role === 'admin' || user.role === 'operations' ? (
					<ListItem data-testid="workers-item">
						<ListItemText
							primary={`Assigned Workers: ${thisProject.assignedWorkers.join(
								', '
							)}`}
						/>
					</ListItem>
				) : (
					<ListItem />
				)}
				{thisProject.imageUrls.length > 0 &&
				user.role !== 'customer' &&
				user.role !== 'sales' ? (
					<div>
						<ListItem data-testid="photo-item">
							<ListItemText primary="Photos: " />
						</ListItem>
						<ListItem>
							<Link to={`/photo-review/${thisProject.id}`}>
								<Button variant="contained">View Photos</Button>
							</Link>
						</ListItem>
					</div>
				) : (
					<ListItem />
				)}
				{user.role !== 'customer' && user.role !== 'sales' ? (
					<ListItem>
						<Button variant="contained" onClick={handleAddTask}>
							Submit
						</Button>
					</ListItem>
				) : (
					<ListItem />
				)}
			</List>
		);
		return (
			<div>
				<Typography
					className="body-header"
					sx={{ fontWeight: 'bold', fontSize: '22px' }}
				>
					Project Information
				</Typography>
				{card}
			</div>
		);
	}
	return (
		<div>
			<Typography>Current User: Not logged in</Typography>
		</div>
	);
}
