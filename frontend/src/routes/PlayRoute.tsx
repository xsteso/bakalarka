import { Redirect, Route } from "react-router-dom";
import { routes } from "./routes";

// Route used when user starts the game or views summary of last gamerun
export const PlayRoute = ({ component: Component, ...rest }) => {
	// check if user has player
	const hasPlayer = !!localStorage.getItem("player");

	return (
		<Route
			{...rest}
			render={(props) =>
				hasPlayer || rest.path === routes.summary ? ( // if user has player or the page is summary, render component
					<Component {...props} />
				) : (
					// else redirect to page, where user has to enter username
					<Redirect to={{ pathname: routes.start, state: { from: props.location } }} />
				)
			}
		/>
	);
};
