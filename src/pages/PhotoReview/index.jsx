/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography, Card, Button, IconButton, FormControl, TextField } from '@mui/material';

import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

import { getProjectByProjectId } from '../../utils/data/projects';
// eAE62yKcuRK4OCQYvmHc
// 308 Negra Arroyo Lane

import '../../styles/photoreview.css';

function PhotoReview() {
	const { projectid } = useParams();

	const [projectData, setProjectData] = useState({});
	const [photoIdx, setPhotoIdx] = useState(0);
	const [photoPage, setPhotoPage] = useState(1);
	const [photoPages, setPhotoPages] = useState(1);

	const MAX_PHOTOS = 4;

	useEffect(() => {
		const fetchProject = async () => {
			const project = await getProjectByProjectId(projectid);
			setProjectData(project);
			console.log(project);
			setPhotoPages(Math.ceil(project.imageUrls.length / MAX_PHOTOS));
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

	console.log(photoPages);
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
				{	
					photoPage > 1 &&
					<IconButton 
						size="large"
						onClick={() => {
							setPhotoPage(photoPage - 1);
						}}
					>
						<ArrowLeftRoundedIcon fontSize="large"/>
					</IconButton>
				}
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
				{	photoPage < photoPages &&
					<IconButton size="large"
					onClick={() => {
						setPhotoPage(photoPage + 1);
					}}
				>
					<ArrowRightRoundedIcon fontSize="large"/>
				</IconButton>
				}
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
				<FormControl>
					<TextField
						label='Estimated Cost'
						type="number"
						InputProps={{ inputProps: { min: 0 }}}
						variant="filled"
						required
					>
					</TextField>
					<TextField
						label="Estimated Completion Date"
						variant="filled"
						type="date"
						margin="dense"
						required
						InputLabelProps={{ shrink: true }}
					/>
					<Button variant="contained">Approve</Button>
					<Button variant="contained">Reject</Button>
				</FormControl>
			</Box>
		</Box>
	);
}

export default PhotoReview;
