import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";

function Breakdown() {
    return (
        <Box>
            <Box m="1.5rem 2.5rem">
                <Header title="Breakdown" subtitle="Sales by category" />
                <Box mt="2rem" height="70vh">
                    <BreakdownChart />
                </Box>
            </Box>
        </Box>
    );
}

export default Breakdown;
