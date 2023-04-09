import React, { useState, useEffect } from 'react';
import { getProjectsByCustomerId, createNewProject } from 'utils/data/projects';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextInput } from 'components/FormikMuiFields';

function UserDisplay() {
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			setError(null);

			try {
				const fetchedUserData = await getProjectsByCustomerId(id);
				setUserData(fetchedUserData);
			} catch (caughtError) {
				setError(caughtError);
			}

			setIsLoading(false);
		}

		fetchData();
	}, [id]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h1>Customer Details</h1>
			{userData &&
				userData?.map((customer) => (
					<div key={customer.address}>
						<dl>
							<dt>{customer.address}</dt>
							<dd>{customer.status}</dd>
						</dl>
						<br />
					</div>
				))}
			<hr />
			<h2 className="page-header">Add a new project for the customer</h2>
			<Formik
				initialValues={{ address: '' }}
				onSubmit={async ({ address }, { setSubmitting }) => {
					try {
						setSubmitting(true);
						createNewProject(id, address);
					} catch (e) {
						// eslint-disable-next-line
						console.log(e);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field
							name="address"
							component={TextInput}
							placeholder="Address"
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
							{isSubmitting ? <CircularProgress size={24} /> : 'add project'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default UserDisplay;
