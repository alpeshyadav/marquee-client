import * as React from "react";
import axios from "axios";
import config from "../../config.json";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledDataGrid } from "./styles";

const Companies = () => {
    const navigate = useNavigate();
    const matches = useMediaQuery("(min-width:600px)");

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const response = await axios.get(config.LIST_URL);
            let count = 0;
            setRows(response.data.data.map((row) => ({ ...row, id: count++ })));
        })();
    }, []);

    const columns = [
        { field: "cin", headerName: "CIN", flex: 0.5, sortable: true },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            sortable: true,
            valueFormatter: (params) => params.value.split("-").join(" "),
        },
    ];

    const handleCompany = () => {
        navigate("/");
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                flexDirection: "column",
            }}
        >
            <Box>
                <Button variant="contained" onClick={handleCompany}>
                    Add company
                </Button>
            </Box>
            <Box sx={{ width: matches ? "60%" : "90%", p: 4, height: 370 }}>
                <StyledDataGrid
                    disableSelectionOnClick
                    disableColumnMenu
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>
        </Box>
    );
};

export default Companies;
