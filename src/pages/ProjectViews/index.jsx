/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
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
	if (user !== null) {
		if (user.role === 'admin') {
			// Need to get all active projects (I think)
		} else if (user.role === 'operations') {
			// Need to get any projects they are assigned to, show them info relevant to their job
		} else if (user.role === 'sales') {
			// Need to get any projects they have been involved in starting, show sales analytic info
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
					{involvedProjects.map((project) => {
						return (
							<div key={project.id}>
								<br />
								<Typography
									className="body-subheading"
									sx={{ fontWeight: 'bold', fontSize: '18px' }}
								>
									Project ID:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.id}
								</Typography>
								<br />

								<Typography className="body-subheading">
									Project Tasks:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.tasks}
								</Typography>
								<br />

								<Typography className="body-subheading">
									Project Status:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.status}
								</Typography>
								<br />

								<Typography className="body-subheading">
									Project Address:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.address}
								</Typography>
								<br />

								<Typography className="body-subheading">
									Project Cost:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.cost}
								</Typography>
								<br />

								<Typography className="body-subheading">
									Project Customer Notes:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.customerNotes}
								</Typography>
							</div>
						);
					})}
				</div>
			);
		} else if (user.role === 'field') {
			// Need to get projects they're assigned to, show the pics from the sites
			// TODO: Put in a connection to view the pictures for each project
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
					{involvedProjects.map((project) => {
						return (
							<div key={project.id}>
								<br />
								<Typography
									className="body-subheading"
									sx={{ fontWeight: 'bold', fontSize: '18px' }}
								>
									Project ID:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.id}
								</Typography>
								<br />

								<Typography className="body-subheading">
									Project Tasks:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.tasks}
								</Typography>
								<br />

								<Typography className="body-subheading">
									Project Status:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.status}
								</Typography>
								<br />

								<Typography className="body-subheading">
									Project Address:
								</Typography>
								<Typography
									className="project-text"
									sx={{ fontSize: '14px', paddingLeft: '5px' }}
								>
									{'     '}
									{project.address}
								</Typography>
							</div>
						);
					})}
				</div>
			);
		} else if (user.role === 'customer') {
			// Need to show projects they are customers of, maybe allowed to see pics, otheriwse just progress
		}
	}
	return (
		<div>
			<Typography>Current User: Not logged in</Typography>
		</div>
	);
}
