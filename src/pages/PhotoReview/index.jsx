/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography, Card, Button } from '@mui/material';

import { getProjectByProjectId } from '../../utils/data/projects';
// eAE62yKcuRK4OCQYvmHc
// 308 Negra Arroyo Lane

import styles from '../../styles/photoreview.css';

function PhotoReview() {
	const { projectid } = useParams();

	const [projectData, setProjectData] = useState({});
	const [photoIdx, setPhotoIdx] = useState(0);

	useEffect(() => {
		const fetchProject = async () => {
			const project = await getProjectByProjectId(projectid);
			setProjectData(project);
			console.log(project);
		};
		fetchProject();
	}, [projectid]);

	if (Object.keys(projectData).length === 0) {
		return <div>Loading...</div>;
	} else if (projectData.imageUrls.length === 0) {
		return <div>No photos found for this project</div>;
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
			<Typography variant="h1">Inspection Photo Review</Typography>
			<Typography>Project ID: {projectid}</Typography>
			<Typography>Address: {projectData.address}</Typography>
			<Card>
				<Typography>
					Photo {photoIdx + 1} of {projectData.imageUrls.length}
				</Typography>
				<img
					className="review-photo-large"
					src={projectData.imageUrls[photoIdx]}
				></img>
			</Card>
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				{projectData.imageUrls.map((url, idx) => {
					return (
						<Card
							sx={{
								m: 2,
								display: 'flex',
								flexDirection: 'column',
								border: 'grey 1px solid'
							}}
						>
							<img className="review-photo-thumbnail" src={url}></img>
							<Button
								onClick={() => setPhotoIdx(idx)}
								variant="contained"
								sx={{ maxWidth: '50%', margin: 'auto' }}
							>
								View
							</Button>
						</Card>
					);
				})}
			</Box>
		</Box>
	);
}

export default PhotoReview;
