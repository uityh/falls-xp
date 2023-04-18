import React, { useState } from 'react';
import * as Yup from 'yup';
import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	Stack,
	Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextInput } from 'components/FormikMuiFields';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authenticateUser } from 'utils/data/users';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/Auth';

const schema = Yup.object().shape({
	email: Yup.string()
		.required('Email is required')
		.matches(
			// eslint-disable-next-line no-useless-escape
			/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
			'Invalid email'
		),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters'),
});

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const { refreshAuthState } = useAuthContext();
	const navigate = useNavigate();

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Box
			sx={{
				minHeight: '60vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Formik
				validationSchema={schema}
				initialValues={{ email: '', password: '' }}
				onSubmit={async ({ email, password }, { setSubmitting }) => {
					try {
						setSubmitting(true);
						await authenticateUser(email, password);
						await refreshAuthState();
						navigate('/dashboard');
					} catch (e) {
						// eslint-disable-next-line
						console.log(e);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form style={{ width: '100%', maxWidth: 600 }}>
						<Stack gap={2} alignItems="center">
							<Typography
								variant="h3"
								component="h1"
								textTransform="uppercase"
								textAlign="center"
							>
								Sign In
							</Typography>
							<Field
								name="email"
								component={TextInput}
								placeholder="Email Address"
								required
							/>
							<Field
								name="password"
								component={TextInput}
								placeholder="Password"
								type={showPassword ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								required
							/>
							<Button
								type="submit"
								variant="contained"
								sx={{
									height: '3rem',
									width: '10rem',
								}}
								disabled={isSubmitting}
							>
								{isSubmitting ? <CircularProgress size={24} /> : 'Sign In'}
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	);
}
