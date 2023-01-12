import { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOffOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    PointOfSaleOutlined,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const navItems = [
    { text: "Dashboard", icon: <HomeOutlined /> },
    { text: "Client Facing", icon: null },
    { text: "Products", icon: <ShoppingCartOutlined /> },
    { text: "Customers", icon: <Groups2Outlined /> },
    { text: "Transactions", icon: <ReceiptLongOutlined /> },
    { text: "Geography", icon: <PublicOffOutlined /> },
    { text: "Sales", icon: null },
    { text: "Overview", icon: <PointOfSaleOutlined /> },
    { text: "Daily", icon: <TodayOutlined /> },
    { text: "Monthly", icon: <CalendarMonthOutlined /> },
    { text: "Breakdown", icon: <PieChartOutlined /> },
    { text: "Management", icon: null },
    { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
    { text: "Performance", icon: <TrendingUpOutlined /> },
];

function Sidebar({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNotMobile,
}) {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => {
                        setIsSidebarOpen(false);
                    }}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNotMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="0.5rem"
                                >
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        fontSize="1.7rem"
                                    >
                                        IMMO INC.
                                    </Typography>
                                </Box>
                                {!isNotMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSidebarOpen(!isSidebarOpen)
                                        }
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: "2.25rem 0 1rem 3rem" }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lowercaseText = text.toLowerCase();
                                return (
                                    <ListItem
                                        key={text}
                                        disablePadding
                                        sx={{
                                            "&:hover": {
                                                background:
                                                    theme.palette
                                                        .secondary[300],
                                            },
                                        }}
                                    >
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lowercaseText}`);
                                                setActive(lowercaseText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lowercaseText
                                                        ? theme.palette
                                                              .secondary[300]
                                                        : "transparent",

                                                color:
                                                    active === lowercaseText
                                                        ? theme.palette.color
                                                              .alt
                                                        : theme.palette
                                                              .secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lowercaseText
                                                            ? theme.palette
                                                                  .color.alt
                                                            : theme.palette
                                                                  .secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lowercaseText && (
                                                <ChevronRightOutlined
                                                    sx={{ ml: "auto" }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box
                        // position="sticky"
                        position="-webkit-sticky"
                        bottom={0}
                        pb="2rem"
                        mt="2rem"
                        backgroundColor="inherit"
                        sx={{ position: "sticky" }}
                    >
                        <Divider />
                        <FlexBetween
                            textTransform="none"
                            gap="1rem"
                            m="1.5rem 2rem 0 3rem"
                        >
                            {/* <Box component='img' alt="profile picture" src={profileImage} height='40px' width='40px' borderRadius='50%' sx={{objectFit: 'cover'}}/> */}
                            <Avatar height="40px" width="40px" />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px",
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
}

export default Sidebar;
