import React from 'react';
import { Routes as RRDRoutes, Route } from 'react-router-dom';
import NotFound from 'pages/404';
import Home from 'pages/Home';
import CustomerLeads from 'pages/CustomerLeads';
import ProjectViews from 'pages/ProjectViews';
import PhotoReview from 'pages/PhotoReview';
import ServiceRequest from 'pages/ServiceRequest';
import SingleUser from 'pages/Users/SingleUser';
import SignIn from 'pages/SignIn';
// import SignUp from 'pages/SignUp';
import Users from 'pages/Users';
import Dashboard from 'pages/Dashboard';

function Routes() {
	return (
		<RRDRoutes>
			<Route index element={<Home />} />
			<Route path="/customer-leads" element={<CustomerLeads />} />
			<Route path="/sign-in" element={<SignIn />} />
			{/**
			 * 	This is not being used in site currently, but is being left in the event it is needed again
			 *  <Route path="/sign-up" element={<SignUp />} /> */}
			<Route path="/users">
				<Route index element={<Users />} />
				<Route path=":id" element={<SingleUser />} />
			</Route>
			<Route path="/service-request" element={<ServiceRequest />} />
			<Route path="/project-views" element={<ProjectViews />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/photo-review/:projectid" element={<PhotoReview />} />
			<Route path="*" element={<NotFound />} />
		</RRDRoutes>
	);
}

export default Routes;
