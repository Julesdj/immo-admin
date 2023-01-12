import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
    Logout,
} from "@mui/icons-material";
import {
    Avatar,
    AppBar,
    Button,
    IconButton,
    InputBase,
    Toolbar,
    useTheme,
    Box,
    Typography,
    Menu,
    MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import FlexBetween from "components/FlexBetween";
import { setMode } from "state";
import { useState } from "react";
import { logout } from "services/authn.service";
import { useNavigate } from "react-router-dom";
// import profileImage from 'assets/profile.jpeg'

function Navbar({ user, isSidebarOpen, setIsSidebarOpen, isNotMobile }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/*LEFT SIDE */}
                <FlexBetween>
                    <IconButton
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <MenuIcon sx={{ fontSize: "32px" }} />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="8px"
                        gap="3rem "
                        p="0.1rem 1.25rem"
                    >
                        <InputBase placeholder="Search" />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/*RIGHT SIDE */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    {isNotMobile && (
                        <IconButton>
                            <SettingsOutlined sx={{ fontSize: "25px" }} />
                        </IconButton>
                    )}
                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Avatar height="32px" width="32px" />
                            {isNotMobile && (
                                <Box textAlign="left">
                                    <Typography
                                        fontWeight="bold"
                                        fontSize="0.85rem"
                                        sx={{
                                            color: theme.palette.secondary[100],
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                    <Typography
                                        fontSize="0.75rem"
                                        sx={{
                                            color: theme.palette.secondary[200],
                                        }}
                                    >
                                        {user.occupation}
                                    </Typography>
                                </Box>
                            )}
                            <ArrowDropDownOutlined
                                sx={{
                                    color: theme.palette.secondary[200],
                                    fontSize: "25px",
                                }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                        >
                            <MenuItem>
                                <Button
                                    variant="outlined"
                                    endIcon={<Logout />}
                                    onClick={handleLogout}
                                    sx={{
                                        // backgroundColor:
                                        //     theme.palette.secondary.light,
                                        border: `1px solid ${theme.palette.secondary.main}`,
                                        color: theme.palette.secondary.main,
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                        "&:hover": {
                                            bgcolor: theme.palette.transparent,
                                            border: `1px solid ${theme.palette.secondary.main}`,
                                        },
                                    }}
                                >
                                    Log out
                                </Button>
                            </MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
