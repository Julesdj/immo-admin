import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

function Layout() {
    const isNotMobile = useMediaQuery("(min-width:600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const drawerWidth = "250px";
    return (
        <Box
            display={isNotMobile ? "flex" : "block"}
            width="100%"
            height="100%"
        >
            <Sidebar
                isNotMobile={isNotMobile}
                drawerWidth={drawerWidth}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet /> {/* Working as children props} */}
            </Box>
        </Box>
    );
}

export default Layout;
