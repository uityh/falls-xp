/* eslint-disable */
import React from 'react';

import { addTaskToProject } from '../../utils/data/projects';

function ProgressTracker() {

	const handleAddTask = async () => { 
		await addTaskToProject("p7BU45bm7WUFWg3COThK", "initial inspection", false);
	}


	return(
		<div>
			<button onClick={handleAddTask}>Submit</button>
		</div>
	)

};

export default ProgressTracker;