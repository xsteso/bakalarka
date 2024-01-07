import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

// paper containing statistic's key and value
export const StatisticsPaper = ({
  identifier,
  value,
  Icon,
  color,
}: {
  identifier: number;
  value: any;
  Icon?: React.FunctionComponent;
  color?: string;
}) => (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        py: 1,
      }}
    >
      {Icon && (
        <Avatar sx={{ backgroundColor: color || "#363636", mr: 3 }}>
          <Icon />
        </Avatar>
      )}

      <Box>
        <Typography component={"div"} variant="caption">
          {identifier}
        </Typography>
        <Typography component={"h6"} variant="h6" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Box>
  );
