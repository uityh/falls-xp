import React from 'react';
import { useParams } from 'react-router-dom';

function ProjectDashboard() {
	const { id } = useParams();
	return <div> Project Dashboard {id} </div>;
}

export default ProjectDashboard;
