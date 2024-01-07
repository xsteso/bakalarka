import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getComparator } from "../../helpers/comparators";
import { stableSort } from "../../helpers/sorters";
import { delay } from "../../helpers/utils";
import { deleteType, fetchTypes, postType } from "../../http/types";
import { DeleteDialog } from "../DeleteDialog";
import { ErrorBox } from "../form/ErrorBox";
import { EnhancedTableHead } from "./EnchancedTableHead";
import { EnhancedTableToolbar } from "./EnchancedTableToolbar";

export const TypeTable = () => {
	// alert after deleting
	const [alert, setAlert] = useState("");
	// all Types
	const [data, setData] = useState([]);
	// searched Types
	const [searchedData, setSearchedData] = useState([]);
	// selected Types, stored only id of Type
	const [selected, setSelected] = useState([]);
	// sorting order = ascending/descending
	const [order, setOrder] = useState("asc");
	// which column is used for sorting
	const [orderBy, setOrderBy] = useState("id");
	// current table page
	const [page, setPage] = useState(0);
	// keyword used for searching
	const [searchedKeyword, setSearchedKeyword] = useState("");
	// name of new Type
	const [typeName, setTypeName] = useState("");
	// delete prompt
	const [deleteOpen, setDeleteOpen] = useState(false);

	const { t } = useTranslation();

	const rowsPerPage = 6;
	const headCells = [
		{
			id: "id",
			numeric: true,
			disablePadding: true,
			label: t("TYPES.ID"),
		},
		{
			id: "type",
			numeric: false,
			disablePadding: false,
			label: t("TYPES.ONE"),
		},
	];

	// fetch Types on table mount
	useEffect(() => {
		fetchTypes().then((types) => setData(types));
	}, []);

	// when Types are updated (removed or added), request search
	useEffect(() => {
		requestSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, searchedKeyword]);

	const requestSearch = () => {
		setSelected([]); // clear hook with selected Types

		const filteredRows = data.filter(
			(row) =>
				// search by type ID and text of type
				[row.id, row.type].filter((text) =>
					t(text).toString().toLowerCase().includes(searchedKeyword.toLowerCase()),
				).length > 0,
		);

		setSearchedData(filteredRows);
	};

	const handleDeleteSelected = async () => {
		// delete each Type by its ID, if successful, add ID to deletedTypes
		selected.forEach(async (type_id) => {
			await deleteType(type_id);
		});

		await delay(500);

		setDeleteOpen(false);
		setAlert(null);
		setAlert(t("NOTIFICATIONS.DELETE_SUCCESS"));
		setSelected([]);
		fetchTypes().then((types) => setData(types));
	};

	// handler for changing order and column used for sorting
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		// if checkbox for selecting all Types has been checked
		// add IDs of all Signs to selected hook, otherwise clear selected
		if (event.target.checked) {
			const newSelecteds = searchedData.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	// handler for selecting/unselecting row
	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// compute empty rows on current page
	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - searchedData.length)
			: rowsPerPage - searchedData.length;

	// handler for changing value of new Type
	const handleTypeNameChange = (e) => {
		setTypeName(e.target.value);
	};

	// handler for adding new Type
	const handleAddType = () => {
		if (typeName.trim().length > 0) {
			// post new Type, if successful, add Type to data
			postType({ type: typeName }).then((res) => {
				setData([...data, res.data]);
			});
		}

		setTypeName("");
	};

	const tableCells = (row, isItemSelected) => (
		<>
			{/* TableCell for CheckBox */}
			<TableCell padding="checkbox" onClick={(event) => handleClick(event, row.id)}>
				<Checkbox color="primary" checked={isItemSelected} />
			</TableCell>
			{/* TableCell for Type ID */}
			<TableCell component="th" id={row.id} padding="none" scope="row" align="right">
				{row.id}
			</TableCell>
			{/* TableCell for text of Type */}
			<TableCell>
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}>
					{t(row.type)}
				</div>
			</TableCell>
		</>
	);

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				p: 2,
			}}>
			<ErrorBox severity="info" error={alert} />

			<Typography variant="h4" mb={3}>
				{t("TYPES.TITLE")}
			</Typography>

			<EnhancedTableToolbar
				numSelected={selected.length}
				onDelete={() => setDeleteOpen(true)} // handler for deleting rows
			/>
			<TextField
				style={{ marginLeft: "5px" }}
				value={searchedKeyword}
				label={t("LABELS.SEARCH")}
				size="small"
				onChange={(val) => setSearchedKeyword(val.target.value)}
			/>

			<TableContainer>
				<Table size="medium">
					<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={searchedData.length}
						headCells={headCells}
					/>
					<TableBody>
						{
							// sort searched Types
							stableSort(searchedData, getComparator(order, orderBy, t))
								// get Types for current page
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								// map row into cells
								.map((row) => {
									// true if row is selected, otherwise false
									const isItemSelected = isSelected(row.id);

									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}>
											{tableCells(row, isItemSelected)}
										</TableRow>
									);
								})
						}
						{
							// generate empty row if there is not enough Types for current page
							emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}>
									<TableCell colSpan={3} />
								</TableRow>
							)
						}
					</TableBody>
				</Table>
			</TableContainer>
			{/* Textfield for creating new type */}
			<Box sx={{ display: "flex", alignItems: "center", mt: "1em" }}>
				<TextField
					fullWidth
					size="small"
					style={{ paddingLeft: 5, paddingRight: 5 }}
					value={typeName}
					label={t("TYPES.NEW")}
					onChange={handleTypeNameChange}
				/>
				<Button
					variant="contained"
					onClick={handleAddType}
					color="primary"
					startIcon={<AddCircleIcon />}
					sx={{ ml: "1em" }}>
					{t("BUTTON.ADD")}
				</Button>
			</Box>
			<TablePagination
				rowsPerPageOptions={[]}
				labelRowsPerPage=""
				component="div"
				count={searchedData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
			/>

			<DeleteDialog open={deleteOpen} setOpen={setDeleteOpen} confirm={handleDeleteSelected} />
		</Box>
	);
};
