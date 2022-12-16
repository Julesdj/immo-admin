import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useGetUserQuery } from "state/api";

function Layout() {
    const drawerWidth = "250px";
    const isNotMobile = useMediaQuery("(min-width:600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId);
    const { data } = useGetUserQuery(userId);
    return (
        <Box
            display={isNotMobile ? "flex" : "block"}
            width="100%"
            height="100%"
        >
            <Sidebar
                user={data || {}}
                isNotMobile={isNotMobile}
                drawerWidth={drawerWidth}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar
                    user={data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet /> {/* Working as children props} */}
            </Box>
        </Box>
    );
}

export default Layout;
