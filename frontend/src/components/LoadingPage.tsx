import Box from "@mui/material/Box";
import { LoadingSpinner } from "./LoadingSpinner";

export const LoadingPage = () => (
	<Box width="100%" display="flex" justifyContent="center" alignItems="center" py="2rem">
		<LoadingSpinner width={"50px"} />
	</Box>
);
