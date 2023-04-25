/* eslint-disable */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
	Box,
	Typography,
	Card,
	Button,
	IconButton,
	FormControl,
	TextField,
	Select,
	MenuItem,
	InputLabel,
} from '@mui/material';

import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

import {
	getProjectByProjectId,
	addTaskToProject,
	markTaskAsComplete,
} from '../../utils/data/projects';

import '../../styles/photoreview.css';

function PhotoReview() {
	const { projectid } = useParams();
	const [projectData, setProjectData] = useState({});
	const [photoIdx, setPhotoIdx] = useState(0);
	const [photoPage, setPhotoPage] = useState(1);
	const [photoPages, setPhotoPages] = useState(1);

	const [dateInput, setDateInput] = useState(new Date());
	const [statusInput, setStatusInput] = useState('approve');
	const [notesInput, setNotesInput] = useState('');

	const navigate = useNavigate();

	const MAX_PHOTOS = 4;

	useEffect(() => {
		const fetchProject = async () => {
			const project = await getProjectByProjectId(projectid);
			setProjectData(project);
			setPhotoPages(Math.ceil(project.imageUrls.length / MAX_PHOTOS));
		};
		fetchProject();
	}, [projectid]);

	const comment = useMemo(() => {
		if (!projectData) return undefined;
		const siteReviewTask =
			projectData?.tasks?.find(
				(task) => task.taskName === 'initial inspection'
			) ?? undefined;
		return siteReviewTask?.comment;
	}, [projectData]);

	const handleViewPhotoButton = (idx) => {
		setPhotoIdx((photoPage - 1) * MAX_PHOTOS + idx);
	};

	const handleSubmitButton = async () => {
		try {
			// Approving adds the 'customer confirmation' task to the project, and marks the 'site review' task as complete.
			if (statusInput === 'approve') {
				await addTaskToProject(
					projectid,
					'customer confirmation',
					`Approved: Estimated completion date is ${dateInput}`,
					true
				);
			}
			// Rejecting marks the 'site review' task as completed, and notes that it was rejected.
			if (statusInput === 'reject') {
				await markTaskAsComplete(
					projectid,
					'site review',
					`Rejected: ${notesInput}`
				);
			}
			navigate('/dashboard');
		} catch (e) {
			console.error(e);
		}
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
			{comment && (
				<Typography>
					<span
						style={{
							fontWeight: ' bold',
						}}
					>
						Comment from On-Site team:
					</span>{' '}
					{comment}
				</Typography>
			)}
			<Card
				sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', mt: 4 }}
			>
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
									onClick={() => handleViewPhotoButton(idx)}
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
				<InputLabel id="status-select-label">Review Results</InputLabel>
				<FormControl>
					<Select
						labelId="status-select-label"
						data-testid="status-select"
						value={statusInput}
						size="small"
						onChange={(e) => {
							setStatusInput(e.target.value);
						}}
					>
						<MenuItem data-testid="approve-menu-item" value="approve">
							Approve
						</MenuItem>
						<MenuItem data-testid="reject-menu-item" value="reject">
							Reject
						</MenuItem>
					</Select>
					<br />
					{statusInput === 'reject' ? (
						<TextField
							data-testid="reject-reason-input"
							onChange={(e) => {
								setNotesInput(e.target.value);
							}}
							label="Reason for Rejection"
							multiline
							variant="filled"
							type="text"
							margin="dense"
							required
							InputLabelProps={{ shrink: true }}
						/>
					) : (
						statusInput === 'approve' && (
							<TextField
								data-testid="date-input"
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
					{statusInput !== '' && (
						<Button
							data-testid="submit-button"
							onClick={handleSubmitButton}
							variant="contained"
						>
							Submit
						</Button>
					)}
				</FormControl>
			</Box>
		</Box>
	);
}

export default PhotoReview;
