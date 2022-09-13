import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import throttle from "lodash/throttle";
import config from "../../config.json";
import { Box, Button, Snackbar, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [value, setValue] = React.useState("");
    const [loadingText, setLoadingText] = React.useState("No data found.");
    const [error, setError] = React.useState("");

    const navigate = useNavigate();
    const matches = useMediaQuery("(min-width:600px)");

    const fetchRequest = React.useMemo(
        () =>
            throttle(async (request, callback) => {
                const response = await axios.post(config.SEARCH_URL, request);
                console.log(response.data);
                callback(response.data.data);
            }, 200),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === "") {
            setOptions([]);
            setLoadingText("No data found.");
            return undefined;
        }

        setLoadingText("Searching...");
        setTimeout(() => {
            fetchRequest({ search: inputValue }, (results) => {
                if (active) {
                    if (results.length) {
                        setOptions(
                            results.map((result) => ({
                                name: result[0],
                                cin: result[1],
                            }))
                        );
                    } else {
                        setLoadingText("No data found.");
                    }
                }
            });
        }, 500);

        return () => {
            active = false;
        };
    }, [inputValue, fetchRequest]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleSubmit = () => {
        (async () => {
            const response = await axios.post(config.SAVE_URL, {
                cin: value.cin,
            });
            if (response.data.status === "success") {
                navigate("/companies");
            } else {
                setError(response.data.error);
            }
        })();
        setValue("");
    };

    const handleClose = () => {
        setError("");
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                gap: 4,
                flexDirection: matches ? "row" : "column",
            }}
        >
            {error ? (
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={true}
                    onClose={handleClose}
                    autoHideDuration={2000}
                    message={error}
                    key={"topright"}
                />
            ) : null}
            <Box sx={{ display: "flex" }}>
                <Autocomplete
                    sx={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onChange={(event, value) => setValue(value)}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    options={options}
                    noOptionsText={loadingText}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Companies"
                            InputProps={{
                                ...params.InputProps,
                            }}
                        />
                    )}
                />
            </Box>
            <Box sx={{ display: "flex", height: "100%" }}>
                <Button
                    disabled={!value}
                    onClick={handleSubmit}
                    variant="contained"
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default Search;
