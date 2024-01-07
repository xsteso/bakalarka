import { Box } from "@mui/material";
import { LoginHeader } from "./LoginHeader";

export const PageWrapper = ({ fullWidth = true, fullHeight = true, children, ...otherProps }) => (
	<Box
		sx={{
			width: "100%",
			display: "flex",
			justifyContent: "center",
		}}
		{...otherProps}>
		{/* Header with manage button, which redirects to admin section */}
		<LoginHeader />
		<Box
			sx={{
				maxWidth: fullWidth ? "100%" : "1000px",
				marginTop: "90px",
				width: "100%",
				position: "relative",
				height: fullHeight ? "auto" : "fit-content",
				p: 3,
			}}>
			{children}
		</Box>
	</Box>
);
