import React from 'react';
import { useAuthContext } from 'contexts/Auth';
import { Navigate } from 'react-router-dom';
import AdminDash from './AdminDash';
import OnsiteDash from './OnsiteDash';
import OperationsDash from './OperationsDash';

function Dashboard() {
	const { user } = useAuthContext();

	if (user !== null) {
		if (user.role === 'admin') {
			return AdminDash(user);
		}
		if (user.role === 'operations') {
			return OperationsDash(user);
		}
		if (user.role === 'field') {
			return OnsiteDash(user);
		}
	}
	return <Navigate to="/sign-in" />;
}

export default Dashboard;
