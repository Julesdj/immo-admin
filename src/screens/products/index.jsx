import { useState } from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductStatsQuery } from "state/api";

const ProductCard = ({ product, yearlySalesTotal, yearlyTotalSoldUnits }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
            }}
        >
            <CardContent>
                <Typography
                    fontSize={14}
                    color={theme.palette.secondary[700]}
                    gutterBottom
                >
                    {product.category}
                </Typography>
                <Typography variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography mb="1.5rem" color={theme.palette.secondary[400]}>
                    ${Number(product.price).toFixed(2)}
                </Typography>
                <Rating value={product.rating} readOnly />
                <Typography variant="body2">{product.description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                color={theme.palette.neutral[300]}
            >
                <CardContent>
                    <Typography>Product id: {product._id}</Typography>
                    <Typography>Supply left: {product.supply}</Typography>
                    <Typography>
                        Sales this year : {yearlySalesTotal}
                    </Typography>
                    <Typography>
                        Units sold this year: {yearlyTotalSoldUnits}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

function ProductWithStats() {
    const { data, isLoading } = useGetProductStatsQuery();
    const isNotMobile = useMediaQuery("(min-width: 1024px)");
    return (
        <Box m="1.5rem 2.5rem">
            <Header
                title="Products Stats"
                subtitle="List of products with stats"
            />
            {data || !isLoading ? (
                <Box
                    mt="1.5rem"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="1.5rem"
                    columnGap="1.33%"
                    sx={{
                        "& > div": {
                            gridColumn: isNotMobile ? undefined : "span 4",
                        },
                    }}
                >
                    {data.map(
                        ({
                            productId,
                            yearlySalesTotal,
                            yearlyTotalSoldUnits,
                        }) => (
                            <ProductCard
                                product={productId}
                                yearlySalesTotal={yearlySalesTotal}
                                yearlyTotalSoldUnits={yearlyTotalSoldUnits}
                                key={productId._id}
                            />
                        )
                    )}
                </Box>
            ) : (
                <Box height="100%" width="100%" textAlign="center">
                    <Typography variant="h2" m="20% auto">
                        Loading ...
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default ProductWithStats;
