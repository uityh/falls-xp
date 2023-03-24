/* eslint-disable no-console */
import {
	Box,
	Button,
	CircularProgress,
	InputAdornment,
	Stack,
} from '@mui/material';
import { Select, TextInput } from 'components/FormikMuiFields';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { createUser } from 'utils/data/users';

const roles = ['Admin', 'Sales', 'Customer', 'Operations', 'Field'];

function CreateUser({ onSuccess = () => {} }) {
	return (
		<Box>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					role: '',
				}}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						setSubmitting(true);
						const res = await createUser(values);
						onSuccess(res);
					} catch (e) {
						console.error(e);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Stack gap={2} sx={{ width: '100%' }}>
							<Field
								name="firstName"
								label="First Name"
								component={TextInput}
								required
							/>
							<Field
								name="lastName"
								label="Last Name"
								component={TextInput}
								required
							/>
							<Field
								name="email"
								label="E-Mail"
								component={TextInput}
								type="email"
								required
							/>
							<Field
								name="phone"
								label="Phone"
								component={TextInput}
								type="tel"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">+1</InputAdornment>
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
								required
							/>
							<Button
								variant="contained"
								type="submit"
								disabled={isSubmitting}
								sx={{ alignSelf: 'flex-end' }}
							>
								{isSubmitting ? <CircularProgress /> : 'Create'}
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	);
}

export default CreateUser;
