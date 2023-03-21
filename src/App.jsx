import Layout from 'components/Layout';
import React from 'react';
import Routes from 'routes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'styles/globals.css';
import { AuthContextProvider } from 'contexts/Auth';

function App() {
	return (
		<AuthContextProvider>
			<Layout>
				<Routes />
			</Layout>
		</AuthContextProvider>
	);
}

export default App;
