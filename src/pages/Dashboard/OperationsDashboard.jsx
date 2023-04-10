import React, { useState } from 'react';

function OperationsDashboard() {
	const [projects, setProjects] = useState([]);
	const getUsers = useCallback(async () => {
		const allProjects = await getAllProjects();
		setProjects(allProjects);
	}, []);
	useEffect(() => {
		getUsers();
	}, [getUsers]);
	return <div>OperationsDashboard</div>;
}

export default OperationsDashboard;
