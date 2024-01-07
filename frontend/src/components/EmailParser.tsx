import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { useTranslation } from "react-i18next";
import { WarningDialog } from "./WarningDialog";

export const SIGN_CLASS = (signId) => `sign_highlight_type_${signId}`;

const HighlightedBox = styled("span")({
	backgroundColor: "#FFFF00",
	color: "black",
	padding: "4px",
	margin: "0 8px",
	display: "inline-table",
	textAlign: "center",
	animation: "zoom-highlight 1s infinite ease",

	"@keyframes zoom-highlight": {
		"0%": {
			transform: "scale(1, 1)",
		},
		"50%": {
			transform: "scale(1.1, 1.1)",
		},
		"100%": {
			transform: "scale(1, 1)",
		},
	},
});

// window with sender, subject and body of email
// contains also answer buttons
export const EmailParser = ({ email, signs = null }) => {
	// dialog with alert when clicking url in email
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	if (!email) {
		return null;
	}

	const signsExtended = signs?.map((sign) => ({
		...sign,
		class: SIGN_CLASS(sign.id),
	}));

	const htmlParserTransform = (node, index) => {
		if (node.type === "tag" && node.name === "a") {
			// a tag named a
			const { href } = node.attribs; // extract the actual url
			const handleClick = (event) => {
				event.preventDefault(); // prevent the default behaviour
				setOpen(true);
			};

			node.name = "span";

			return (
				<a
					href={href} // show it as the actual url, when hovered over
					onClick={handleClick}
					onMouseDown={handleClick}>
					<span style={{ pointerEvents: "none" }}>
						{convertNodeToElement(node, index, htmlParserTransform)}
					</span>
				</a>
			);
		}

		const signFound = signsExtended?.find((sign) => sign.class === node.attribs?.class);

		if (signFound) {
			return (
				<Tooltip
					enterTouchDelay={0}
					leaveTouchDelay={5000}
					title={<h3 style={{ fontWeight: "lighter" }}>{t(signFound.text)}</h3>}>
					<HighlightedBox>{convertNodeToElement(node, index, htmlParserTransform)}</HighlightedBox>
				</Tooltip>
			);
		}
	};

	return (
		<>
			<WarningDialog open={open} setOpen={setOpen} />
			{ReactHtmlParser(email?.body, {
				transform: htmlParserTransform,
			})}
		</>
	);
};
