import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = (e) => {
		e.preventDefault();
		createUser()
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				document.write('Account created!');
				console.log(userCredential);
			})
			.catch((error) => {
				document.write('Failed to create account');
				console.log(error);
			});
	};

	return (
		<div className="sign-in-container">
			<form onSubmit={signUp}>
				<h1>Create Account</h1>
				<input
					type="email"
					placeholder="Email Address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

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
import { useAuthContext } from 'contexts/Auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'utils/firebase';
import { createUser } from 'utils/data/users';

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
		.min(8, 'Password must be at least 8 characters'),
});

export default function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const { setUser } = useAuthContext();
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
						const user = await authenticateUser(email, password);
						setUser(user);
						navigate('/');
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
								Sign Up
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
								{isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	);
}
