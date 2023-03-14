import { Button, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import image from './404.png';

function NotFound() {
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate('/');
	};
	const location = useLocation();
	const message = location?.state?.message;
	return (
		<div className="notFound__container">
			<div className="notFound__content">
				<img src={image} alt="404" />
				<p className="notFound__content__header">Oops !</p>
				<Typography className="notFound__content_text">
					{message || 'Looks like you have come too far away from our base'}
					<br />
					Let us take you back
				</Typography>
				<Button
					type="button"
					className="notFound__content__btn"
					onClick={handleNavigate}
				>
					Go Home
				</Button>
			</div>
		</div>
	);
}

export default NotFound;
