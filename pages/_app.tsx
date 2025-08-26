import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import { useApollo } from '../apollo/client';
import '../scss/app.scss';
import { light } from '../scss/MaterialTheme';
import '../scss/mobile/main.scss';
import '../scss/pc/main.scss';

const App = ({ Component, pageProps }: AppProps) => {
	// @ts-ignore
	const [theme, setTheme] = useState(createTheme(light));
	const client = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default appWithTranslation(App);
