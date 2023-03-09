import React from 'react';
import { Routes as RRDRoutes, Route } from 'react-router-dom';
import NotFound from 'pages/404';
import Home from 'pages/Home';

function Routes() {
	return (
		<RRDRoutes>
			<Route index element={<Home />} />
			<Route path="*" element={<NotFound />} />
		</RRDRoutes>
	);
}

export default Routes;
