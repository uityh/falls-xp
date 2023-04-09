import {
	Box,
	Button,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import CreateUser from 'components/Forms/CreateUser';
import Modal from 'components/Modal';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from 'utils/data/users';

function Users() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [createUserModal, setCreateUserModal] = useState(false);
	const getUsers = useCallback(async () => {
		const allUsers = await getAllUsers();
		setUsers(allUsers);
	}, []);
	useEffect(() => {
		getUsers();
	}, [getUsers]);
	const headers = ['First Name', 'Last Name', 'E-Mail', 'Role'];
	return (
		<Box>
			<Modal
				title="Create User"
				isOpen={createUserModal}
				handleClose={() => {
					setCreateUserModal(false);
				}}
			>
				<CreateUser
					onSuccess={(newUser) => {
						setUsers([...users, newUser]);
						setCreateUserModal(false);
					}}
				/>
			</Modal>
			<Stack alignItems="flex-end">
				<Button
					onClick={() => {
						setCreateUserModal(true);
					}}
					variant="contained"
				>
					Create User
				</Button>
			</Stack>
			<Table sx={{ p: 2 }}>
				<TableHead>
					<TableRow>
						{headers.map((headCell) => (
							<TableCell key={headCell} sx={{ fontWeight: 'bold' }}>
								{headCell}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<TableRow
							key={user.id}
							onClick={() => {
								if (user.role === 'customer') {
									navigate(`/users/${user.id}`);
								} else {
									alert('not a customer');
								}
							}}
							sx={{ cursor: 'pointer' }}
						>
							<TableCell>{user.firstName}</TableCell>
							<TableCell>{user.lastName}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
}

export default Users;
