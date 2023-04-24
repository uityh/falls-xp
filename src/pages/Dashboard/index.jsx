import React from 'react';
import { useAuthContext } from 'contexts/Auth';
import { Navigate } from 'react-router-dom';
import Dash from './Dash';
// import OperationsDashboard from './OperationsDashboard';
// import OnsiteDashboard from './OnsiteDashboard';
// import SalesDashboard from './SalesDash';

function Dashboard() {
	const { user } = useAuthContext();

	// if (user?.role === 'operations') return <OperationsDashboard user={user} />;
	// if (user?.role === 'field') return <OnsiteDashboard user={user} />;
	// if (user?.role === 'sales') return <SalesDashboard user={user} />;

	if (user !== null) {
		let header = 'Dashboard';
		switch (user.role) {
			case 'admin':
				header = 'Admin Dashboard';
				break;
			case 'onsite':
				header = 'On-Site Team Dashboard';
				break;
			case 'operations':
				header = 'Operations Team Dashboard';
				break;
			case 'sales':
				header = 'Sales Team Dashboard';
				break;
			default:
				break;
		}
		return <Dash user={user} header={header} />;
	}
	return <Navigate to="/sign-in" />;
}

export default Dashboard;
