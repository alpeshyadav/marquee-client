import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { Companies, Search } from "./components";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Search />}></Route>
                    <Route path="/companies" element={<Companies />}></Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
