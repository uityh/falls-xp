import React from 'react';
import { Routes as RRDRoutes, Route } from 'react-router-dom';
import NotFound from 'pages/404';
import Home from 'pages/Home';
import CustomerLeads from 'pages/CustomerLeads';
import SingleUser from 'pages/Users/SingleUser';
import ServiceRequest from 'pages/ServiceRequest';
import Users from 'pages/Users';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

function Routes() {
	return (
		<RRDRoutes>
			<Route index element={<Home />} />
			<Route path="/customer-leads" element={<CustomerLeads />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/users">
				<Route index element={<Users />} />
				<Route path=":id" element={<SingleUser />} />
			</Route>
			<Route path="/service-request" element={<ServiceRequest />} />
			<Route path="*" element={<NotFound />} />
		</RRDRoutes>
	);
}

export default Routes;
