import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "./LoadingSpinner";

export const LoadingNoItemsHandler = ({
	loading,
	noItems,
	error,
	width,
}: {
	loading: boolean;
	noItems?: boolean;
	error?: boolean;
	width?: string;
}) => {
	const { t } = useTranslation();

	return (
		<>
			{loading && (
				<Box width="100%" display="flex" justifyContent="center" alignItems="center" py="2rem">
					<LoadingSpinner width={width ?? "50px"} />
				</Box>
			)}

			{noItems && !loading && <Alert severity="info">{t("LABELS.NO_ITEMS")}</Alert>}

			{error && !loading && <Alert severity="error">{t("LABELS.ERROR")}</Alert>}
		</>
	);
};
