import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from 'utils/data/users';

function Users() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
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
			<Button variant="contained">Create User</Button>
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
								navigate(`/users/${user.id}`);
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
