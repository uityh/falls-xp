import Helmet from 'components/Helmet';
import Layout from 'components/Layout';
import React from 'react';
import 'styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Helmet />
			<Component {...pageProps} />
		</Layout>
	);
}
