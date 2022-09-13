import { createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: { main: "#000", contrastText: yellow["A700"] },
        secondary: { main: yellow["A400"] },
    },
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: "none",
                },
                cell: {
                    border: "none",
                },
            },
        },
    },
});
