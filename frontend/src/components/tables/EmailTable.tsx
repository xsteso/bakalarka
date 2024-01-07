import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PlayerAnswer } from "../../api/models";
import { ErrorBox } from "../../components/form/ErrorBox";
import { getComparator } from "../../helpers/comparators";
import { stableSort } from "../../helpers/sorters";
import { delay, exportEmails } from "../../helpers/utils";
import {
	deleteEmail,
	fetchEmailsByGamerunID,
	fetchEmailsWithStatistics,
	updateEnabled,
} from "../../http/emails";
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
 * Table handling emails, if gamerunID is passed,
 * show emails related to the gamerun
 * @param {number} gamerunID ID of gamerun, not required
 * @param {boolean} hideCheckbox show or hide checkboxes in rows]
 * @param {number} toolbarHidden show or hide table toolbar
 * @param {boolean} pagination show or hide pagination
 */
export const EmailTable = ({
	gamerunID,
	statistics,
	hideCheckbox = false,
	toolbarHidden = false,
	pagination = true,
	deleteAllowed = true,
	exportAllowed = true,
}: {
	gamerunID?: string;
	statistics?: Array<PlayerAnswer>;
	hideCheckbox?: boolean;
	toolbarHidden?: boolean;
	pagination?: boolean;
	deleteAllowed?: boolean;
	exportAllowed?: boolean;
}) => {
	const classes = useStyles();
	// alert after deleting
	const [alert, setAlert] = useState("");
	// loading
	const [loading, setLoading] = useState(false);
	// non searched Emails
	const [data, setData] = useState([]);
	// searched Emails
	const [searchedData, setSearchedData] = useState([]);
	// selected Emails, stored only id of Email
	const [selected, setSelected] = useState([]);
	// sorting order = ascending/descending
	const [order, setOrder] = useState("asc");
	// which column is used for sorting
	const [orderBy, setOrderBy] = useState("id");
	// keyword
	const [searchedKeyword, setSearchedKeyword] = useState("");
	// current table page
	const [page, setPage] = useState(0);
	// row per page
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// delete prompt
	const [deleteOpen, setDeleteOpen] = useState(false);

	const { t } = useTranslation();

	const headCellsEmails = [
		{
			id: "id",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.ID"),
		},
		{
			id: "enabled",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.ENABLED"),
		},
		{
			id: "subject",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.SUBJECT"),
		},
		{
			id: "type.type",
			numeric: false,
			disablePadding: false,
			label: t("TYPES.ONE"),
		},
		{
			id: "occurrence",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.OCCURRENCE"),
		},
		{
			id: "average_correctness",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.AVG_CORRECTNESS"),
		},
		{
			id: "average_duration",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.AVG_DURATION"),
		},
	];

	const headCellsGamerun = [
		{
			id: "id",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.ID"),
		},
		{
			id: "enabled",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.ENABLED"),
		},
		{
			id: "subject",
			numeric: false,
			disablePadding: false,
			label: t("EMAILS.SUBJECT"),
		},
		{
			id: "type.type",
			numeric: false,
			disablePadding: false,
			label: t("TYPES.ONE"),
		},
		{
			id: "duration",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.DURATION"),
		},
		{
			id: "answer",
			numeric: false,
			disablePadding: false,
			label: t("GAMERUNS.ANSWER"),
		},
	];

	// fetch emails on table mount
	useEffect(() => {
		fetchAllEmails(gamerunID);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gamerunID]);

	// when emails are updated (removed or added), request search
	useEffect(() => {
		requestSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, searchedKeyword]);

	const fetchAllEmails = (gamerunID?: string) => {
		setLoading(true);

		if (gamerunID) {
			// if gamerunID is present, fetch emails by gamerunID
			fetchEmailsByGamerunID(gamerunID).then((emails) => {
				setData(emails);
				setLoading(false);

				if (emails?.length < rowsPerPage) {
					setRowsPerPage(emails?.length);
				}
			});
		} else {
			// if gamerunID is undefined, fetch all emails
			fetchEmailsWithStatistics().then((emails) => {
				setData(emails);
				setLoading(false);

				if (emails?.length < rowsPerPage) {
					setRowsPerPage(emails?.length);
				}
			});
		}
	};

	const requestSearch = () => {
		setSelected([]); // clear hook with selected Emails

		const filteredRows = data.filter(
			(row) =>
				[row.id, row.subject, row.body, row.type.type].filter(
					(text) => !!text && text.toString().toLowerCase().includes(searchedKeyword.toLowerCase()), // check if text contains searched value
				).length > 0,
		);

		setSearchedData(filteredRows);
	};

	const handleDeleteSelected = async () => {
		// delete each Email by its id
		selected.forEach(async (email_id) => await deleteEmail(email_id));

		await delay(500);

		setDeleteOpen(false);
		setAlert(null);
		setAlert(t("NOTIFICATIONS.DELETE_SUCCESS"));
		setSelected([]);
		fetchAllEmails(gamerunID);
	};

	const handleExportedFiles = () => {
		const selectedEmails = data.filter((email) => selected.includes(email.id));

		exportEmails(selectedEmails);
	};

	const handleEnableSelected = async (enabled: boolean) => {
		// enable or disable each Email by its id
		selected.forEach(async (email_id) => {
			await updateEnabled(email_id, enabled);
		});

		await delay(500);

		setAlert(null);
		setAlert(enabled ? t("NOTIFICATIONS.ENABLE_SUCCESS") : t("NOTIFICATIONS.DISABLE_SUCCESS"));
		setSelected([]);
		fetchAllEmails(gamerunID);
	};

	// handler for changing order and column used for sorting
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		// if checkbox for selecting all Emails has been checked
		// add ids of all Emails to selected hook, otherwise clear selected
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

	const isSelected = (id) => selected.indexOf(id) !== -1;

	// compute empty rows on current page
	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - searchedData.length)
			: rowsPerPage - searchedData.length;

	const getFilteredData = () => {
		// sort searched emails
		let data = searchedData;

		if (statistics?.length) {
			data = data.map((email, index) => ({
				...email,
				answer: statistics[index].correctness,
				duration: statistics[index].players_duration,
			}));
		}

		let filteredData = stableSort(data, getComparator(order, orderBy, t));

		if (pagination) {
			// get emails for current page
			filteredData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
		}

		return filteredData;
	};

	// function used for creating rows in Email table
	const tableCells = (row, isRowSelected) => {
		if (statistics?.length) {
			return (
				<>
					{/* TableCell for CheckBox */}
					<TableCell
						sx={{ display: hideCheckbox ? "none" : "" }}
						hidden={true}
						padding="checkbox"
						onClick={(event) => handleClick(event, row.id)}>
						<Checkbox color="primary" checked={isRowSelected} />
					</TableCell>
					{/* TableCell for email ID */}
					<TableCell id={row.id}>
						<Button
							component={Link}
							endIcon={<OpenInNewIcon />}
							to={routes.settings + settingsRoutes.emails + `/${row.id}`}
							target="_blank">
							{row.id}
						</Button>
					</TableCell>
					{/* TableCell if email is enabled */}
					<TableCell>
						<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
							{
								<Chip
									sx={{ backgroundColor: row.enabled ? "#C3F9C3" : "#FDBFBF" }}
									label={row.enabled ? t("EMAILS.ENABLED") : t("EMAILS.DISABLED")}
								/>
							}
						</Typography>
					</TableCell>
					{/* TableCell for email subject */}
					<TableCell>
						<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
							{row.subject}
						</Typography>
					</TableCell>
					{/* TableCell for text of email's type */}
					<TableCell>
						<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
							{t(row.type.type)}
						</Typography>
					</TableCell>
					{/* TableCell for players duration */}
					<TableCell>
						<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
							{row.duration || "-"}
						</Typography>
					</TableCell>
					{/* TableCell for user answer */}
					<TableCell>
						<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
							{row.answer ? `✅ ${t("PLAY.CORRECT")}` : `❌ ${t("PLAY.WRONG")}`}
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
					<Checkbox color="primary" checked={isRowSelected} />
				</TableCell>
				{/* TableCell for email ID */}
				<TableCell id={row.id}>
					<Button
						component={Link}
						endIcon={<OpenInNewIcon />}
						to={routes.settings + settingsRoutes.emails + `/${row.id}`}
						target="_blank">
						{row.id}
					</Button>
				</TableCell>
				{/* TableCell if email is enabled */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{
							<Chip
								sx={{ backgroundColor: row.enabled ? "#C3F9C3" : "#FDBFBF" }}
								label={row.enabled ? t("EMAILS.ENABLED") : t("EMAILS.DISABLED")}
							/>
						}
					</Typography>
				</TableCell>
				{/* TableCell for email subject */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{row.subject}
					</Typography>
				</TableCell>
				{/* TableCell for text of email's type */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{t(row.type.type)}
					</Typography>
				</TableCell>
				{/* TableCell for email occurrence */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{row.occurrence ? `${row.occurrence}x` : "-"}
					</Typography>
				</TableCell>
				{/* TableCell for email average correctness */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{row.average_correctness ? `${row.average_correctness} %` : "-"}
					</Typography>
				</TableCell>
				{/* TableCell for email average duration */}
				<TableCell>
					<Typography component={"div"} variant="inherit" className={classes.ellipsis}>
						{row.average_duration || "-"}
					</Typography>
				</TableCell>
			</>
		);
	};

	return (
		<Box sx={{ width: "100%" }}>
			{data?.length ? (
				<>
					<ErrorBox severity="info" error={alert} />

					{!toolbarHidden && (
						<EnhancedTableToolbar
							numSelected={selected.length}
							onDelete={deleteAllowed && (() => setDeleteOpen(true))} // handler for deleting rows
							onExport={exportAllowed && handleExportedFiles} // handler for deleting rows
							onEnable={() => handleEnableSelected(true)}
							onDisable={() => handleEnableSelected(false)}
						/>
					)}

					{/* Search TextField */}
					<TextField
						style={{ width: "100%" }}
						value={searchedKeyword} // searched keyword
						label="Search"
						size="small"
						onChange={(e) => setSearchedKeyword(e.target.value)}
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
								headCells={statistics?.length ? headCellsGamerun : headCellsEmails}
								hideCheckbox={hideCheckbox}
							/>
							<TableBody>
								{getFilteredData().map((row) => {
									// true if row is selected, otherwise false
									const isRowSelected = isSelected(row.id);

									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.id}
											selected={isRowSelected}>
											{tableCells(row, isRowSelected)}
										</TableRow>
									);
								})}
								{
									// generate empty row if there is not enough emails for current page
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
