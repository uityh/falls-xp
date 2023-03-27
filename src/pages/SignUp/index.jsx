/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
//! This file is not being used in website currently, there is no need for it
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
import { TextInput, Select } from 'components/FormikMuiFields';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUser } from 'utils/data/users';
import { useAuthContext } from 'contexts/Auth';
import { useNavigate } from 'react-router-dom';

const roles = ['Admin', 'Sales', 'Customer', 'Operations', 'Field'];

const schema = Yup.object().shape({
	firstName: Yup.string().required('First Name is Required'),
	lastName: Yup.string().required('Last Name is Required'),
	phone: Yup.string().required('Phone Number is required'),
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
				initialValues={{
					firstName: '',
					lastName: '',
					phone: '',
					email: '',
					password: '',
				}}
				onSubmit={async (
					{ firstName, lastName, phone, email, password, role },
					{ setSubmitting }
				) => {
					try {
						setSubmitting(true);
						const info = {
							firstName: firstName,
							lastName: lastName,
							phone: phone,
							email: email,
							password: password,
							role: role,
						};
						const user = await createUser(info);
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
								name="firstName"
								component={TextInput}
								placeholder="First Name"
								required
							/>
							<Field
								name="lastName"
								component={TextInput}
								placeholder="Last Name"
								required
							/>
							<Field
								name="phone"
								component={TextInput}
								placeholder="Phone Number"
								required
							/>
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
							<Field
								name="role"
								label="Role"
								component={Select}
								options={roles.map((r) => ({
									value: r.toLowerCase(),
									label: r,
								}))}
								placeholder="Role"
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
