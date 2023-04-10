/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
	Box,
	Typography,
	Card,
	Button,
	IconButton,
	FormControl,
	TextField,
	Select,
	MenuItem
} from '@mui/material';

import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

import { getProjectByProjectId } from '../../utils/data/projects';

import '../../styles/photoreview.css';

function PhotoReview() {
	const { projectid } = useParams();
	const [projectData, setProjectData] = useState({});
	const [photoIdx, setPhotoIdx] = useState(0);
	const [photoPage, setPhotoPage] = useState(1);
	const [photoPages, setPhotoPages] = useState(1);

	const [dateInput, setDateInput] = useState(new Date());
	const [resultSelect, setResultSelect] = useState('');

	const MAX_PHOTOS = 4;

	useEffect(() => {
		const fetchProject = async () => {
			const project = await getProjectByProjectId(projectid);
			setProjectData(project);
			setPhotoPages(Math.ceil(project.imageUrls.length / MAX_PHOTOS));
		};
		fetchProject();
	}, [projectid]);

	const handleViewPhotoButton = (event, idx) => {
		setPhotoIdx((photoPage - 1) * MAX_PHOTOS + idx);
	};

	const handleApproveButton = () => {
		console.log('Approve');
		// Call data function to approve project
	};

	const handleRejectButton = () => {
		console.log('Reject');
		// Call data function to reject project
	};

	if (Object.keys(projectData).length === 0) {
		return <div>Loading...</div>;
	} else if (projectData.imageUrls.length === 0) {
		return <div>No photos found for this project</div>;
	}

	return (
		<Box
			data-testid="photo-review-box"
			sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}
		>
			<Typography variant="h1">Inspection Photo Review</Typography>
			<Typography>Project ID: {projectid}</Typography>
			<Typography>Address: {projectData.address}</Typography>
			<Card sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
				<Typography>
					Photo {photoIdx + 1} of {projectData.imageUrls.length}
				</Typography>
				<img
					data-testid="photo-review-large"
					className="review-photo-large"
					src={projectData.imageUrls[photoIdx]}
				></img>
			</Card>
			<Box sx={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
				{photoPage > 1 && (
					<IconButton
						data-testid="photo-review-previous-page-button"
						size="large"
						onClick={() => {
							setPhotoPage(photoPage - 1);
						}}
					>
						<ArrowLeftRoundedIcon fontSize="large" />
					</IconButton>
				)}
				{projectData.imageUrls
					.slice((photoPage - 1) * MAX_PHOTOS, photoPage * MAX_PHOTOS)
					.map((url, idx) => {
						return (
							<Card
								data-testid={`photo-review-thumbnail-${
									(photoPage - 1) * MAX_PHOTOS + idx
								}`}
								key={idx}
								sx={{
									m: 2,
									display: 'flex',
									flexDirection: 'column',
									border: 'grey 1px solid',
								}}
							>
								<img className="review-photo-thumbnail" src={url}></img>
								<Button
									data-testid={`photo-review-view-button-${
										(photoPage - 1) * MAX_PHOTOS + idx
									}`}
									onClick={(event) => handleViewPhotoButton(event, idx)}
									variant="contained"
									sx={{ maxWidth: '50%', margin: 'auto' }}
								>
									View
								</Button>
							</Card>
						);
					})}
				{photoPage < photoPages && (
					<IconButton
						data-testid="photo-review-next-page-button"
						size="large"
						onClick={() => {
							setPhotoPage(photoPage + 1);
						}}
					>
						<ArrowRightRoundedIcon fontSize="large" />
					</IconButton>
				)}
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
				<FormControl>
					<Select
						size="small"
						onChange={(e) => {
							setResultSelect(e.target.value);
						}}
					>
						<MenuItem value="approve">Approve</MenuItem>
						<MenuItem value="reject">Reject</MenuItem>
					</Select>
					<br />
					{resultSelect === 'reject' ? (
						<TextField
							label="Reason for Rejection"
							multiline
							variant="filled"
							type="text"
							margin="dense"
							required
							InputLabelProps={{ shrink: true }}
						/>
					) : (
						resultSelect === 'approve' && (
							<TextField
								onChange={(e) => {
									setDateInput(e.target.value);
								}}
								label="Estimated Completion Date"
								variant="filled"
								type="date"
								margin="dense"
								required
								InputLabelProps={{ shrink: true }}
							/>
						)
					)}
					{resultSelect !== '' && <Button variant="contained">Submit</Button>}
				</FormControl>
			</Box>
		</Box>
	);
}

export default PhotoReview;
