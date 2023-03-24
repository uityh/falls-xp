/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography, Card, Button } from '@mui/material';

import { getProjectByProjectId } from '../../utils/data/projects';
// eAE62yKcuRK4OCQYvmHc
// 308 Negra Arroyo Lane

import '../../styles/photoreview.css';

function PhotoReview() {
	const { projectid } = useParams();

	const [projectData, setProjectData] = useState({});
	const [photoIdx, setPhotoIdx] = useState(0);
	const [photoPage, setPhotoPage] = useState(1);

	const MAX_PHOTOS = 4;
	let photoPages = 1;

	useEffect(() => {
		const fetchProject = async () => {
			const project = await getProjectByProjectId(projectid);
			setProjectData(project);
			photoPages = Math.ceil(project.imageUrls.length / MAX_PHOTOS);
		};
		fetchProject();
	}, [projectid]);

	const handleViewPhotoButton = (event, idx) => {
		console.log(event, idx);
		setPhotoIdx((photoPage - 1) * MAX_PHOTOS + idx);
	};

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
			<Card sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
				<Typography>
					Photo {photoIdx + 1} of {projectData.imageUrls.length}
				</Typography>
				<img
					className="review-photo-large"
					src={projectData.imageUrls[photoIdx]}
				></img>
			</Card>
			<Box sx={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
				<Button
					onClick={() => {
						setPhotoPage(photoPage - 1);
					}}
				>
					Previous
				</Button>
				{projectData.imageUrls
					.slice((photoPage - 1) * MAX_PHOTOS, photoPage * MAX_PHOTOS)
					.map((url, idx) => {
						return (
							<Card
								key={idx}
								sx={{
									m: 2,
									display: 'flex',
									flexDirection: 'column',
									border: 'grey 1px solid'
								}}
							>
								<img className="review-photo-thumbnail" src={url}></img>
								<Button
									onClick={(event) => handleViewPhotoButton(event, idx)}
									variant="contained"
									sx={{ maxWidth: '50%', margin: 'auto' }}
								>
									View
								</Button>
							</Card>
						);
					})}
				<Button
					onClick={() => {
						setPhotoPage(photoPage + 1);
					}}
				>
					Next
				</Button>
			</Box>
			<Box></Box>
		</Box>
	);
}

export default PhotoReview;
