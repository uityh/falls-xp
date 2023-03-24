/* eslint-disable no-unused-vars */
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
		} else if (user.role === 'field') {
			// Need to get projects they're assigned to, show the pics from the sites
		} else if (user.role === 'customer') {
			// Need to show projects they are customers of, maybe allowed to see pics, otheriwse just progress
		}
	}
	return (
		<div>
			Project Views Page
			<Typography>
				Current User: {user?.firstName ?? 'Not Logged in'}
			</Typography>
			{user && (
				<Typography>
					Role: {user?.role}
					Projects:
					{involvedProjects.map((project) => {
						return (
							<div>
								<br />
								<p>{project.id}</p>
								<p>{project.tasks}</p>
								<p>{project.status}</p>
								<p>{project.address}</p>
							</div>
						);
					})}
				</Typography>
			)}
		</div>
	);
}
