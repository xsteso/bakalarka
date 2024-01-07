import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import PropTypes from "prop-types";
import * as React from "react";

// Table head creating table row with given headCells
export const EnhancedTableHead = (props: {
  onSelectAllClick;
  order;
  orderBy;
  numSelected;
  rowCount;
  onRequestSort;
  headCells;
  iconCell;
  hideCheckbox?;
}) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    iconCell,
    hideCheckbox,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property); // calls sortHandler with property (name of headCell)
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{ display: hideCheckbox ? "none" : "" }}
        >
          <Checkbox
            color="primary"
            // if all rows has been selected, check the box in table head
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headCells.map(
          // map given headCells into TableCell
          (headCell) => (
            <TableCell
              key={headCell.id}
              // if value of headCell is numeric, align right
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
            >
              <TableSortLabel
                active={orderBy === headCell.id} // show sort icon if actual ordering is by this headCell
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)} // calls sorting handler
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          )
        )}
        {/* if iconCell is true, make TableCell for icon column */}
        {iconCell && <TableCell />}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  // number of selected rows in table
  numSelected: PropTypes.number.isRequired,
  // handler for managing order and orderBy items of sort
  onRequestSort: PropTypes.func.isRequired,
  // handler for selecting all rows
  onSelectAllClick: PropTypes.func.isRequired,
  // keyword for ascending/descending order
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  // headCell column used for sorting
  orderBy: PropTypes.string.isRequired,
  // number of rows in table
  rowCount: PropTypes.number.isRequired,
  // cells of Table header
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // identification name of headCell
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  // if true, make extra column at the end for icon
  iconCell: PropTypes.bool,
};
