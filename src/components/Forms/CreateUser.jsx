/* eslint-disable */
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';

function CreateUser() {
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
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{() => (
					<Form>
						
					</Form>
				)}
			</Formik>
		</Box>
	);
}

export default CreateUser;
