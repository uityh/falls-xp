import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { TextArea, TextInput } from 'components/FormikMuiFields';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { createServiceRequest } from 'utils/data/projects';

function InitialInspection({ projectId, salesRepId, onSuccess = () => {} }) {
	return (
		<Box>
			<Formik
				initialValues={{
					startDate: '',
					customerNotes: '',
				}}
				onSubmit={async ({ startDate, customerNotes }, { setSubmitting }) => {
					try {
						setSubmitting(true);
						const res = await createServiceRequest(
							projectId,
							salesRepId,
							startDate,
							customerNotes
						);
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
						<Stack gap={2}>
							<Field
								name="startDate"
								label="Start Date"
								component={TextInput}
								type="date"
								InputLabelProps={{
									shrink: true,
								}}
								required
							/>
							<Field
								name="customerNotes"
								label="Comments"
								component={TextArea}
								minRows={6}
							/>
							<Button
								variant="contained"
								type="submit"
								disabled={isSubmitting}
								sx={{ alignSelf: 'flex-end' }}
							>
								{isSubmitting ? <CircularProgress /> : 'Submit Request'}
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	);
}

export default InitialInspection;
