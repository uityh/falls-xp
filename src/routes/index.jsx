import React from 'react';
import {
	Navigate,
	Routes as RRDRoutes,
	Route,
	useLocation,
} from 'react-router-dom';
import NotFound from 'pages/404';
import CustomerLeads from 'pages/CustomerLeads';
import ProjectViews from 'pages/ProjectViews';
import PhotoReview from 'pages/PhotoReview';
// import ServiceRequest from 'pages/ServiceRequest';
import SingleUser from 'pages/Users/SingleUser';
import SignIn from 'pages/SignIn';
// import SignUp from 'pages/SignUp';
import Users from 'pages/Users';
import ProjectDashboard from 'pages/ProjectDashboard';
import Dashboard from 'pages/Dashboard';
import Project from 'pages/Project';
import { useAuthContext } from 'contexts/Auth';
import ProjectChart from 'pages/ProjectChart';
import PhotoUpload from 'pages/PhotoUpload';
import CallBackRequest from 'pages/CallBackRequest';

function Routes() {
	const { pathname } = useLocation();
	const { user } = useAuthContext();

	const isLoggedIn = Boolean(user);

	if (
		(isLoggedIn && pathname === '/sign-in') ||
		(pathname.includes('/users') && user?.role !== 'admin')
	)
		return <Navigate to="/dashboard" />;

	if (!isLoggedIn && pathname !== '/sign-in') return <Navigate to="/sign-in" />;

	return (
		<RRDRoutes>
			<Route index element={<Navigate to="/dashboard" />} />
			<Route path="/customer-leads" element={<CustomerLeads />} />
			<Route path="/sign-in" element={<SignIn />} />
			{/**
			 * 	This is not being used in site currently, but is being left in the event it is needed again
			 *  <Route path="/sign-up" element={<SignUp />} /> */}
			<Route path="/users">
				<Route index element={<Users />} />
				<Route path=":id" element={<SingleUser />} />
			</Route>
			{/* <Route path="/service-request" element={<ServiceRequest />} /> */}
			<Route path="/project-views" element={<ProjectViews />} />
			<Route path="/project-dashboard" element={<ProjectDashboard />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/photo-review/:projectid" element={<PhotoReview />} />
			<Route path="/photo-upload/:projectId" element={<PhotoUpload />} />
			<Route path="/project/:projectid" element={<Project />} />
			<Route path="/project-chart" element={<ProjectChart />} />
			<Route path="/call-back-request" element={<CallBackRequest />} />
			<Route path="*" element={<NotFound />} />
		</RRDRoutes>
	);
}

export default Routes;
