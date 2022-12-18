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

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="products"
                                element={<ProductWithStats />}
                            />
                            <Route path="customers" element={<Customers />} />
                            <Route
                                path="transactions"
                                element={<Transactions />}
                            />
                            <Route path="geography" element={<Geography />} />
                            <Route path="overview" element={<Overview />} />
                            <Route path="daily" element={<Daily />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
