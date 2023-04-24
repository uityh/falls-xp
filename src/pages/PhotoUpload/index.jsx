import { PhotoCamera } from '@mui/icons-material';
import {
	Box,
	Button,
	ImageList,
	ImageListItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useAuthContext } from 'contexts/Auth';
import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { completeInitialInspection } from 'utils/data/projects';

function PhotoUpload() {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const { projectId } = useParams();
	const [images, setImages] = useState([]);
	const [comment, setComment] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const handleImageUpload = (e) => {
		setImages(Array.from(e.target.files));
	};
	const handleSubmit = async () => {
		try {
			setSubmitting(true);
			await completeInitialInspection(projectId, images, comment);
			navigate('/dashboard');
		} catch (e) {
			console.error(e);
		} finally {
			setSubmitting(false);
		}
	};

	if (user?.role !== 'field') return <Navigate to="/dashboard" />;

	return (
		<>
			<Stack gap={2} alignItems="center">
				<TextField
					multiline
					label="Comment"
					minRows={4}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					fullWidth
				/>
				<Button
					variant="outlined"
					component="label"
					startIcon={<PhotoCamera />}
				>
					Select Images
					<input
						hidden
						accept="image/*"
						multiple
						type="file"
						onChange={handleImageUpload}
					/>
				</Button>
				<Button
					variant="contained"
					sx={{
						alignSelf: 'flex-end',
					}}
					disabled={images.length === 0 || submitting}
					onClick={handleSubmit}
				>
					{submitting ? 'Submitting...' : 'Submit'}
				</Button>
			</Stack>
			{images.length > 0 && (
				<Box mt={2}>
					<Typography variant="h5" gutterBottom>
						Selected Photos
					</Typography>
					<ImageList cols={3} gap={16}>
						{images.map((item) => (
							<ImageListItem key={item.name}>
								<img
									src={URL.createObjectURL(item)}
									alt={projectId}
									style={{
										objectFit: 'contain',
										maxHeight: '250px',
									}}
								/>
							</ImageListItem>
						))}
					</ImageList>
				</Box>
			)}
		</>
	);
}

export default PhotoUpload;
