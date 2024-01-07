import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function EnhancedTableToolbar(props: {
  numSelected: number;
  onDelete: () => void;
  onExport?: () => void;
  onEnable?: () => void;
  onDisable?: () => void;
}) {
  const { numSelected, onDelete, onExport, onEnable, onDisable } = props;
  const { t } = useTranslation();

  const getSelectedLabel = () => {
    if (numSelected === 1) return t("TABLE.SELECTED_1");
    if (numSelected > 1 && numSelected < 5) return t("TABLE.SELECTED_2-4");
    if (numSelected > 5) return t("TABLE.SELECTED_N");
  };

  return (
    <Box>
      <Toolbar
        sx={{
          p: { xs: 0 },
          my: 2,
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          width="100%"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            sx={{ mb: { xs: 2, md: 0 } }}
          >
            {numSelected > 0 && `${numSelected} ${getSelectedLabel()}`}
          </Typography>

          <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
            {onEnable && (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={numSelected === 0}
                sx={{ ml: { xs: 0, md: 2 }, mb: { xs: 2, md: 0 } }}
                onClick={onEnable}
                startIcon={<CheckCircleIcon />}
              >
                {t("BUTTON.ENABLE")}
              </Button>
            )}

            {onDisable && (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={numSelected === 0}
                sx={{ ml: { xs: 0, md: 2 }, mb: { xs: 2, md: 0 } }}
                onClick={onDisable}
                startIcon={<CancelIcon />}
              >
                {t("BUTTON.DISABLE")}
              </Button>
            )}

            {onExport && (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={numSelected === 0}
                sx={{ ml: { xs: 0, md: 2 }, mb: { xs: 2, md: 0 } }}
                onClick={onExport}
                startIcon={<FileDownloadIcon />}
              >
                {t("BUTTON.EXPORT")}
              </Button>
            )}

            {onDelete && (
              <Button
                variant="contained"
                color="error"
                size="large"
                disabled={numSelected === 0}
                sx={{ ml: { xs: 0, md: 2 }, mb: { xs: 2, md: 0 } }}
                onClick={onDelete}
                startIcon={<DeleteIcon />}
              >
                {t("BUTTON.DELETE")}
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
