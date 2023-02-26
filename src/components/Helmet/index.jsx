import Head from 'next/head';
import React from 'react';

function Helmet({ title }) {
	return (
		<Head>
			<title>{title ? `${title} | Falls XP` : 'Falls XP'}</title>
		</Head>
	);
}

export default Helmet;
