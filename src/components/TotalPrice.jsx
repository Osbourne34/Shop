import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

const TotalPrice = React.memo(({ cart }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (cart && cart.length > 0) {
            const totalPrice = () => {
                return cart
                    .map((item) => item.amount * item.price)
                    .reduce((curr, next) => curr + next);
            };
            setTotalPrice(totalPrice());
        } else {
            setTotalPrice(0);
        }
    }, [cart]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alingItems: "center",
            }}
        >
            <Typography sx={{ color: "text.primary" }} variant="h5">
                Итог:{" "}
            </Typography>
            <Typography sx={{ color: "text.primary" }} variant="h5">
                ${totalPrice}
            </Typography>
        </Box>
    );
});

export default TotalPrice;
