import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Button, Container, List, Typography, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { CustomizedPaper } from "../../components/CustomizedPaper";
import { LanguageSelector } from "../../components/LanguageSelector";
import { emailRoutes, gamerunRoutes, routes, settingsRoutes } from "../../routes/routes";
import { loadUser, logout } from "../../store/auth/actions";
import { EmailCreate } from "./EmailCreate";
import { EmailInfoPage } from "./EmailInfoPage";
import { EmailsPage } from "./EmailsPage";
import { GamerunInfoPage } from "./GamerunInfoPage";
import { GamerunsPage } from "./GamerunsPage";
import { GeneralSettingsPage } from "./GeneralSettingsPage";
import { ImportEmailPage } from "./ImportEmailPage";

// Main Settings page, contains only drawer with navigation to general/emails/gameruns and also contains
// Appbar with name of opened subpage. If item in drawer is clicked, settings page shows chosen subpage.
const _SettingsPage = (props) => {
	// state for hiding drawer on mobile devices
	const [mobileOpen, setMobileOpen] = useState(false);
	// state for showing back button in detail pages
	const [showBackButton, setShowBackButton] = useState(false);
	// name of opened subpage
	const [openedPage, setOpenedPage] = useState("");
	const history = useHistory();
	const location = useLocation();
	const theme = useTheme();

	// restore scroll position on navigation
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	const { t } = useTranslation();

	// show opened subpage in appbar, subpage is loaded from pathname
	useEffect(() => {
		const pathname = history.location.pathname;

		if (pathname.includes(settingsRoutes.emails) || pathname.includes(settingsRoutes.gameruns)) {
			// If route contains create, import or detail path we want to show back button
			if (
				pathname.includes(emailRoutes.create) ||
				pathname.includes(emailRoutes.import) ||
				/\d/.test(pathname)
			) {
				setShowBackButton(true);
			} else {
				setShowBackButton(false);
			}

			const oppenedPage = pathname.split("/").slice(2)[0];

			setOpenedPage(oppenedPage);
		} else {
			setOpenedPage("general");
		}
	}, [history.location]);

	// handler for opening navbar on mobiles
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const getOpenedPageLabel = () => {
		const labels = {
			general: "MENU.GENERAL",
			emails: "EMAILS.TITLE",
			gameruns: "GAMERUNS.TITLE",
		};

		return t(labels[openedPage]);
	};

	const navigateBack = () => {
		if (settingsRoutes.emails.includes(openedPage)) {
			history.push(routes.settings + settingsRoutes.emails);
			return;
		}

		if (settingsRoutes.gameruns.includes(openedPage)) {
			history.push(routes.settings + settingsRoutes.gameruns);
			return;
		}

		history.goBack();
	};

	const MenuItem = ({ text, navigateTo, icon }) => (
		<Box
			component={Link}
			to={navigateTo}
			onClick={handleDrawerToggle}
			style={{
				textDecoration: "none",
				color: openedPage.includes(text) ? "#FFF" : theme.palette.text.primary,
				display: "block",
				backgroundColor: openedPage.includes(text) ? theme.palette.primary.main : "none",
			}}>
			<ListItem button>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={text} />
			</ListItem>
		</Box>
	);

	const Navigation = () => (
		<Box display="flex" sx={{ display: { xs: "none", md: "block" } }}>
			<Button
				size="large"
				variant="text"
				component={Link}
				to={routes.settings}
				sx={{
					color: "#FFF",
					backgroundColor: openedPage.includes("general") ? "#83d4d2" : "none",
					marginRight: "1em",
					"&:hover": {
						backgroundColor: "#83d4d2",
					},
				}}
				startIcon={<SettingsIcon />}>
				{t("MENU.GENERAL")}
			</Button>
			<Button
				size="large"
				variant="text"
				component={Link}
				to={routes.settings + settingsRoutes.emails}
				sx={{
					color: "#FFF",
					backgroundColor: openedPage.includes("emails") ? "#83d4d2" : "none",
					marginRight: "1em",
					"&:hover": {
						backgroundColor: "#83d4d2",
					},
				}}
				startIcon={<MailIcon />}>
				{t("EMAILS.TITLE")}
			</Button>
			<Button
				size="large"
				variant="text"
				component={Link}
				to={routes.settings + settingsRoutes.gameruns}
				sx={{
					color: "#FFF",
					backgroundColor: openedPage.includes("gameruns") ? "#83d4d2" : "none",
					marginRight: "1em",
					"&:hover": {
						backgroundColor: "#83d4d2",
					},
				}}
				startIcon={<SportsEsportsIcon />}>
				{t("GAMERUNS.TITLE")}
			</Button>
		</Box>
	);

	const DrawerList = () => (
		<Box>
			<List>
				<MenuItem text={t("MENU.GENERAL")} navigateTo={routes.settings} icon={<SettingsIcon />} />
				<MenuItem
					text={t("EMAILS.TITLE")}
					navigateTo={routes.settings + settingsRoutes.emails}
					icon={<MailIcon />}
				/>
				<MenuItem
					text={t("GAMERUNS.TITLE")}
					navigateTo={routes.settings + settingsRoutes.gameruns}
					icon={<SportsEsportsIcon />}
				/>
			</List>
		</Box>
	);

	return (
		// AppBar with name of opened subpage
		<Box sx={{ display: "flex" }}>
			<AppBar>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
						p: 2.5,
					}}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}>
						<IconButton
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { md: "none" } }}>
							<MenuIcon />
						</IconButton>
						<Navigation />
					</Box>
					<Box display={"flex"} flexWrap={"nowrap"}>
						<LanguageSelector />
						<Button
							size="large"
							variant="contained"
							component={Link}
							onClick={props.logout}
							to="/"
							sx={{ ml: 2 }}
							color="secondary">
							<Box sx={{ display: "flex" }}>
								<LogoutIcon sx={{ mr: { xs: 0, sm: 1 } }} />
								<Box sx={{ display: { xs: "none", sm: "block" } }}>{t("MENU.LOGOUT")}</Box>
							</Box>
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			{/* Navigation Menu */}
			<Box component="nav" sx={{ flexShrink: { sm: 0 } }}>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { sm: "block", md: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: "70%",
						},
					}}>
					<DrawerList />
				</Drawer>
			</Box>
			{/* Container with routing to different pages */}
			<Container maxWidth="xl">
				<Box py="1rem">
					<CustomizedPaper style={{ marginTop: "8em", marginBottom: "3em" }}>
						{showBackButton && (
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									position: { xs: "relative", sm: "absolute" },
								}}>
								<IconButton color="primary" onClick={navigateBack}>
									<ArrowBackIcon />
								</IconButton>
							</Box>
						)}
						<Typography textAlign="center" variant="h3" component="h2">
							{getOpenedPageLabel()}
						</Typography>
						<Switch>
							{/* route to general settings */}
							<Route path={routes.settings} exact component={GeneralSettingsPage} />
							{/* route to email page with EmailTable */}
							<Route path={routes.settings + settingsRoutes.emails} exact component={EmailsPage} />
							{/* route to gamerun page with GamerunTable */}
							<Route
								path={routes.settings + settingsRoutes.gameruns}
								exact
								component={GamerunsPage}
							/>
							<Route
								path={routes.settings + settingsRoutes.emails + emailRoutes.create}
								exact
								component={EmailCreate}
							/>
							<Route
								path={routes.settings + settingsRoutes.emails + emailRoutes.import}
								exact
								component={ImportEmailPage}
							/>
							{/* route to page containing info about email */}
							<Route
								path={routes.settings + settingsRoutes.emails + emailRoutes.detail}
								exact
								component={EmailInfoPage}
							/>
							{/* route to page containing info about gamerun */}
							<Route
								path={routes.settings + settingsRoutes.gameruns + gamerunRoutes.detail}
								exact
								component={GamerunInfoPage}
							/>
							{/* route to page with form for creating new email */}
						</Switch>
					</CustomizedPaper>
				</Box>
			</Container>
		</Box>
	);
};

export const SettingsPage = connect(null, { logout, loadUser })(_SettingsPage);
