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
import { deleteSign, fetchSigns, postSign } from "../../http/signs";
import { DeleteDialog } from "../DeleteDialog";
import { ErrorBox } from "../form/ErrorBox";
import { EnhancedTableHead } from "./EnchancedTableHead";
import { EnhancedTableToolbar } from "./EnchancedTableToolbar";

/**
 * Table handling signs, handler for deleting can be passes and default handler
 * will be ignored.
 * @param {[Object]} signs array of Sign objects, will be in table
 * @param {function} handleDelete handler for deleting signs
 * @param {boolean} allowCreate if true, table will contain input field for creating signs
 */
export const SignTable = () => {
	// alert after deleting
	const [alert, setAlert] = useState("");
	const [data, setData] = useState([]);
	// searched Gameruns
	const [searchedData, setSearchedData] = useState([]);
	// keyword
	const [searchedKeyword, setSearchedKeyword] = useState("");
	// selected Gameruns, stored only id of Gamerun
	const [selected, setSelected] = useState([]);
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("id");
	const [signName, setSignName] = useState("");
	const [page, setPage] = useState(0);
	// delete prompt
	const [deleteOpen, setDeleteOpen] = useState(false);

	const { t } = useTranslation();

	const rowsPerPage = 6;
	const headCells = [
		{
			id: "id",
			numeric: true,
			disablePadding: true,
			label: t("SIGNS.ID"),
		},
		{
			id: "text",
			numeric: false,
			disablePadding: false,
			label: t("SIGNS.ONE"),
		},
	];

	// fetch signs on table mount
	useEffect(() => {
		fetchSigns().then((signsData) => setData(signsData));
	}, []);

	// if array of Signs is modified, request search
	useEffect(() => {
		requestSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, searchedKeyword]);

	const requestSearch = () => {
		setSelected([]); // clear hook with selected Signs

		const filteredRows = data.filter(
			(row) =>
				// search by sign id and text
				[row.id, row.text].filter((text) =>
					t(text).toString().toLowerCase().includes(searchedKeyword.toLowerCase()),
				).length > 0,
		);
		setSearchedData(filteredRows);
	};

	const handleDeleteSelected = async () => {
		// delete each Sign by its ID, if successful, add id to deletedSigns
		selected.forEach(async (sign_id) => {
			await deleteSign(sign_id);
		});

		await delay(500);

		setDeleteOpen(false);
		setAlert(null);
		setAlert(t("NOTIFICATIONS.DELETE_SUCCESS"));
		setSelected([]);
		fetchSigns().then((signsData) => setData(signsData));
	};

	// handler for changing order and column used for sorting
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		// if checkbox for selecting all Signs has been checked
		// add ids of all Signs to selected hook, otherwise clear selected
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

	const isSelected = (id) => selected.indexOf(id) !== -1;

	// compute empty rows on current page
	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - searchedData.length)
			: rowsPerPage - searchedData.length;

	const handleSignNameChange = (e) => {
		setSignName(e.target.value);
	};

	// handler for creating new sign
	const handleCreateSign = () => {
		if (signName.trim().length > 0) {
			// if new Sign post was successful, add that post into data hook
			postSign({ text: signName }).then((res) => {
				setData([...data, res.data]);
			});
		}
		// clear sign input field
		setSignName("");
	};

	// function used for creating rows in Sign table
	const tableCells = (row, isItemSelected) => (
		<>
			{/* TableCell for CheckBox */}
			<TableCell padding="checkbox" onClick={(event) => handleClick(event, row.id)}>
				<Checkbox color="primary" checked={isItemSelected} />
			</TableCell>
			{/* TableCell for Sign ID */}
			<TableCell component="th" id={row.id} padding="none" scope="row" align="right">
				{row.id}
			</TableCell>
			{/* TableCell for text of Sign */}
			<TableCell>
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}>
					{t(row.text)}
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
				{t("SIGNS.TITLE")}
			</Typography>

			<EnhancedTableToolbar
				numSelected={selected.length}
				onDelete={() => setDeleteOpen(true)} // handler for deleting selected rows
			/>
			{/* Search TextField */}
			<TextField
				style={{ marginLeft: 5 }}
				value={searchedKeyword} // searched keyword
				label={t("LABELS.SEARCH")}
				size="small"
				onChange={(val) => setSearchedKeyword(val.target.value)}
			/>

			<TableContainer>
				<Table sx={{}} aria-labelledby="tableTitle" size="medium">
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
							// sort searched Signs
							stableSort(searchedData, getComparator(order, orderBy, t))
								// get Signs for current page
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								// map Sign into row of TableCells
								.map((row) => {
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
							// generate empty rows if there is not enough signs for current page
							emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}>
									<TableCell colSpan={6} />
								</TableRow>
							)
						}
					</TableBody>
				</Table>
			</TableContainer>
			{/* Textfield for creating new sign */}
			<Box sx={{ display: "flex", alignItems: "center", mt: "1em" }}>
				{/* if creating new signs is allowed, render textfield */}
				<TextField
					fullWidth
					size="small"
					style={{ paddingLeft: 5, paddingRight: 5 }}
					value={signName}
					label={t("SIGNS.NEW")}
					onChange={handleSignNameChange}
				/>
				<Button
					variant="contained"
					onClick={handleCreateSign}
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
