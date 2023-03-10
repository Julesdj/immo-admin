import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "screens/dashboard";
import Layout from "screens/layout";
import ProductWithStats from "screens/products";
import Customers from "screens/customers";
import Geography from "screens/customers/Geography";
import Transactions from "screens/transactions";
import Overview from "screens/overview";
import Daily from "screens/daily";
import Monthly from "screens/monthly";
import Breakdown from "screens/breakdown";
import Admin from "screens/admin";
import Performance from "screens/admin/Performance";
import Login from "components/Login";
import ProtectedRoutes from "services/ProtectedRoutes";

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/login" replace />}
                        />
                        <Route path="/login" element={<Login />} />

                        <Route element={<ProtectedRoutes />}>
                            <Route element={<Layout />}>
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="products"
                                    element={<ProductWithStats />}
                                />
                                <Route
                                    path="customers"
                                    element={<Customers />}
                                />
                                <Route
                                    path="transactions"
                                    element={<Transactions />}
                                />
                                <Route
                                    path="geography"
                                    element={<Geography />}
                                />
                                <Route path="overview" element={<Overview />} />
                                <Route path="daily" element={<Daily />} />
                                <Route path="monthly" element={<Monthly />} />
                                <Route
                                    path="breakdown"
                                    element={<Breakdown />}
                                />
                                <Route path="admin" element={<Admin />} />
                                <Route
                                    path="performance"
                                    element={<Performance />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
