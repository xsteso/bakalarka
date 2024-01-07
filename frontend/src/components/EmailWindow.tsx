// window with sender, subject and body of email

import { Box } from "@mui/material";
import { Email } from "../api/api";
import { EmailParser } from "./EmailParser";

// contains also answer buttons
export const EmailWindow = ({ email }: { email: Email }) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
		}}>
		<Box sx={{ overflow: "auto", minHeight: "57vh" }}>
			<EmailParser email={email} />
		</Box>
	</Box>
);
