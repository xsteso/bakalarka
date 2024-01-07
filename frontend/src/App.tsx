import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { LoadingPage } from "./components/LoadingPage";
import { IntroPage } from "./pages/play/IntroPage";
import { PlayPage } from "./pages/play/PlayPage";
import { StartPage } from "./pages/play/StartPage";
import { SummaryPage } from "./pages/play/SummaryPage";
import { LoginPage } from "./pages/settings/LoginPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { PlayRoute } from "./routes/PlayRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { routes } from "./routes/routes";
import { loadUser } from "./store/auth/actions";
import { store } from "./store/store";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#639997",
		},
		secondary: {
			main: "#e0e0e0",
		},
		background: {
			default: "#e0e0e0",
			paper: "#FFF",
		},
	},
	typography: {
		fontFamily: ["Montserrat", "sans-serif"].join(","),
	},
});

/**
 * Main App component
 */
export const App = () => {
	// load user from store on page mount
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Suspense fallback={<LoadingPage />}>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Helmet>
						<link href="/static/prismjs/prism.css" rel="stylesheet" />
						<script src="/static/prismjs/prism.js"></script>
					</Helmet>
					<Router>
						<Switch>
							<Route path={routes.home} exact component={IntroPage} />
							<Route path={routes.start} exact component={StartPage} />
							<PlayRoute path={routes.play} exact component={PlayPage} />
							<PlayRoute path={routes.summary} exact component={SummaryPage} />
							<Route path={routes.login} exact component={LoginPage} />
							<PrivateRoute path={routes.settings} component={SettingsPage} />
							<Redirect from="*" to={routes.home} />
						</Switch>
					</Router>
				</ThemeProvider>
			</Provider>
		</Suspense>
	);
};
