import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(() => ({
    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
        {
            outline: "none",
        },
}));
