import Paper from "@mui/material/Paper";
import * as React from "react";

export const CustomizedPaper = ({ narrow = false, children, ...rest }) => (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        width: { xs: "auto", sm: narrow ? 500 : "auto" },
        borderRadius: 7,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
