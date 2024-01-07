import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { parse } from "date-fns";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GameRunWithStatistics } from "../../api/models";
import { ErrorBox } from "../../components/form/ErrorBox";
import { getComparator } from "../../helpers/comparators";
import { stableSort } from "../../helpers/sorters";
import {
	delay,
	exportGameruns,
	fullDateFormat,
	getEllapsedTime,
	getSuccessRate,
} from "../../helpers/utils";
import {
	deleteGamerun,
	fetchGamerunsWithStatistics,
	fetchGamerunWithStatisticsByEmail,
} from "../../http/gameruns";
import { routes, settingsRoutes } from "../../routes/routes";
import { DeleteDialog } from "../DeleteDialog";
import { LoadingNoItemsHandler } from "../LoadingNoItemsHandler";
import { EnhancedTableHead } from "./EnchancedTableHead";
import { EnhancedTableToolbar } from "./EnchancedTableToolbar";

const useStyles = makeStyles({
	ellipsis: {
		maxWidth: 200,
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
});

/**
 * Table handling gameruns, if emailID is passed,
 * show gameruns related to the email
 * @param {number} emailID ID of gamerun, not required
 * @param {boolean} hideCheckbox show or hide checkboxes in rows]
 * @param {number} toolbarHidden show or hide table toolbar
 * @param {boolean} pagination show or hide pagination
 */
export const GamerunsTable = ({
	emailID,
	hideCheckbox = false,
	toolbarHidden = false,
	pagination = true,
	deleteAllowed = true,
	exportAllowed = true,
}: {
	emailID?: string;
	hideCheckbox?: boolean;
	toolbarHidden?: boolean;
	pagination?: boolean;
	deleteAllowed?: boolean;
	exportAllowed?: boolean;
}) => {
	// alert after deleting
	const [alert, setAlert] = useState("");
	const classes = useStyles();
	// non searched Gameruns
	const [data, setData] = useState<Array<GameRunWithStatistics>>([]);
	// loading
	const [loading, setLoading] = useState(false);
	// searched Gameruns
	const [searchedData, setSearchedData] = useState([]);
	// keyword
	const [searchedKeyword, setSearchedKeyword] = useState("");
	// selected Gameruns, stored only id of Gamerun
	const [selected, setSelected] = useState([]);
	// sorting order = ascending/descending
	const [order, setOrder] = useState("asc");
	// which column is used for sorting by default
	const [orderBy, setOrderBy] = useState("id");
	// current table page
	const [page, setPage] = useState(0);
	// row per page
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// delete prompt
	const [deleteOpen, setDeleteOpen] = useState(false);

	const { t } = useTranslation();

	const headCellsGameruns = [
		{
			id: "id",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.ID"),
		},
		{
			id: "player_name",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.PLAYER_NAME"),
		},
		{
			id: "duration",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.DURATION"),
		},
		{
			id: "emails.length",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.NUMBER_OF_EMAILS"),
		},
		{
			id: "success_rate",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.CORRECTLY_ANSWERED"),
		},
	];

	const headCellsEmails = [
		{
			id: "id",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.ID"),
		},
		{
			id: "player_name",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.PLAYER_NAME"),
		},
		{
			id: "players_duration",
			sortDisabled: true,
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.DURATION"),
		},
		{
			id: "players_answer",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.ANSWER"),
		},
	];

	// fetch gameruns on table mount
	useEffect(() => {
		fetchAllGameruns(emailID);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [emailID]);

	// when gameruns are updated (removed or added), search is requested
	useEffect(() => {
		requestSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, searchedKeyword]);

	const fetchAllGameruns = (emailID?: string) => {
		setLoading(true);

		if (emailID) {
			// if emailID is present, fetch gameruns by emailID
			fetchGamerunWithStatisticsByEmail(emailID).then((gameruns) => {
				setData(gameruns);
				setLoading(false);

				if (gameruns?.length < rowsPerPage) {
					setRowsPerPage(gameruns?.length);
				}
			});
		} else {
			// if emailID is undefined, fetch all gameruns
			fetchGamerunsWithStatistics().then((gameruns) => {
				setData(gameruns);
				setLoading(false);

				if (gameruns?.length < rowsPerPage) {
					setRowsPerPage(gameruns?.length);
				}
			});
		}
	};

	const requestSearch = () => {
		setSelected([]); // clear hook with selected Gameruns

		const filteredRows = data.filter(
			(row) =>
				// search by Gamerun id, player_name, start_time and end_time
				[row.id, row.player_name, row.start_time, row.end_time].filter(
					(text) => !!text && text.toString().toLowerCase().includes(searchedKeyword.toLowerCase()),
				).length > 0,
		);

		setSearchedData(filteredRows);
	};

	const handleDeleteSelected = async () => {
		// delete each Gamerun by its id, if successful, add id to deletedEmails
		selected.forEach(async (gamerun_id) => {
			await deleteGamerun(gamerun_id);
		});

		await delay(500);

		setDeleteOpen(false);
		setAlert(null);
		setAlert(t("NOTIFICATIONS.DELETE_SUCCESS"));
		setSelected([]);
		fetchAllGameruns();
	};

	const handleExportedFiles = () => {
		const selectedGameruns = data.filter((gamerun) => selected.includes(gamerun.id));

		exportGameruns(selectedGameruns);
	};

	// handler for changing order and column used for sorting
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		// if checkbox for selecting all Gameruns has been checked
		// add ids of searched Gameruns to selected hook, otherwise clear selected
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

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - searchedData.length)
			: rowsPerPage - searchedData.length;

	const getFilteredData = () => {
		// sort searched gameruns
		let enhancedData = searchedData.map((row) => ({
			...row,
			duration: getEllapsedTime(
				parse(row.start_time, fullDateFormat, new Date()),
				parse(row.end_time, fullDateFormat, new Date()),
				false,
				true,
			),
			success_rate: getSuccessRate(row.statistics, row.emails.length),
		}));

		if (emailID) {
			enhancedData = enhancedData.map((gamerun: GameRunWithStatistics) => {
				const emailIndex = gamerun.emails.indexOf(
					gamerun.emails.find((email) => email.id === +emailID),
				);

				return {
					...gamerun,
					players_duration: emailIndex !== -1 && gamerun.statistics[emailIndex].players_duration,
					players_answer: emailIndex !== -1 && gamerun.statistics[emailIndex].correctness,
				};
			});
		}

		let filteredData = stableSort(enhancedData, getComparator(order, orderBy, t));

		if (pagination) {
			// get gameruns for current page
			filteredData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
		}

		return filteredData;
	};

	// function used for creating rows in Email table
	const TableCells = (row, isItemSelected) => {
		if (emailID) {
			return (
				<>
					{/* TableCell for CheckBox */}
					<TableCell
						sx={{ display: hideCheckbox ? "none" : "" }}
						hidden={true}
						padding="checkbox"
						onClick={(event) => handleClick(event, row.id)}>
						<Checkbox color="primary" checked={isItemSelected} />
					</TableCell>
					{/* TableCell for gamerun ID */}
					<TableCell id={row.id}>
						<Button
							component={Link}
							target="_blank"
							endIcon={<OpenInNewIcon />}
							to={routes.settings + settingsRoutes.gameruns + `/${row.id}`}>
							{row.id}
						</Button>
					</TableCell>
					{/* TableCell for player name */}
					<TableCell>
						<div
							style={{
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}>
							{row.player_name}
						</div>
					</TableCell>
					{/* TableCell for email duration */}
					<TableCell>
						<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
							{row.players_duration}
						</Typography>
					</TableCell>
					{/* TableCell for email answer correctness */}
					<TableCell>
						<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
							<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
								{row.players_answer ? `✅ ${t("PLAY.CORRECT")}` : `❌ ${t("PLAY.WRONG")}`}
							</Typography>
						</Typography>
					</TableCell>
				</>
			);
		}

		return (
			<>
				{/* TableCell for CheckBox */}
				<TableCell
					sx={{ display: hideCheckbox ? "none" : "" }}
					hidden={true}
					padding="checkbox"
					onClick={(event) => handleClick(event, row.id)}>
					<Checkbox color="primary" checked={isItemSelected} />
				</TableCell>
				{/* TableCell for gamerun ID */}
				<TableCell id={row.id}>
					<Button
						component={Link}
						target="_blank"
						endIcon={<OpenInNewIcon />}
						to={routes.settings + settingsRoutes.gameruns + `/${row.id}`}>
						{row.id}
					</Button>
				</TableCell>
				{/* TableCell for player name */}
				<TableCell>
					<div
						style={{
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}>
						{row.player_name}
					</div>
				</TableCell>
				{/* TableCell for duration of Gamerun */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{row.duration}
					</Typography>
				</TableCell>
				{/* TableCell for number of emails emails */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{row.emails?.length}
					</Typography>
				</TableCell>
				{/* TableCell for success rate */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{row.success_rate ? `${row.success_rate} %` : "-"}
					</Typography>
				</TableCell>
			</>
		);
	};

	return (
		<Box sx={{ width: "100%", mb: 3 }}>
			{data?.length ? (
				<>
					{!toolbarHidden && (
						<EnhancedTableToolbar
							numSelected={selected.length}
							onDelete={deleteAllowed && (() => setDeleteOpen(true))} // handler for deleting rows
							onExport={exportAllowed && handleExportedFiles} // handler for deleting rows
						/>
					)}

					<ErrorBox severity="info" error={alert} />
					{/* Search TextField */}
					<TextField
						style={{ width: "100%" }}
						value={searchedKeyword} // searched keyword
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
								headCells={emailID ? headCellsEmails : headCellsGameruns}
								hideCheckbox={hideCheckbox}
							/>

							<TableBody>
								{getFilteredData().map((row) => {
									// true if row is selected, otherwise false
									const isItemSelected = isSelected(row.id);

									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}>
											{TableCells(row, isItemSelected)}
										</TableRow>
									);
								})}
								{
									// generate empty row if there is not enough Gameruns for current page
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
					{pagination && (
						<TablePagination
							rowsPerPageOptions={[
								10,
								20,
								30,
								{ value: searchedData?.length, label: t("TABLE.ALL") },
							]}
							rowsPerPage={rowsPerPage}
							labelRowsPerPage={t("TABLE.ROWS_PER_PAGE")}
							component="div"
							count={data.length}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					)}
				</>
			) : (
				<LoadingNoItemsHandler loading={loading} noItems={data?.length === 0} />
			)}

			<DeleteDialog open={deleteOpen} setOpen={setDeleteOpen} confirm={handleDeleteSelected} />
		</Box>
	);
};
