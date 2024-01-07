import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { LoginPage } from "../pages/settings/LoginPage";

// Private route checks if user is logged in
const _PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			// if authentication is loading, show loading text
			if (auth.isLoading) {
				return <></>;
			}
			// if user is not logged in, redirect to login page
			else if (!auth.isAuthenticated) {
				return <LoginPage />;
				// return <Redirect to="/login" />;
			}
			// if user is logged in, show requested component
			else {
				return <Component {...props} />;
			}
		}}
	/>
);

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export const PrivateRoute = connect(mapStateToProps)(_PrivateRoute);
