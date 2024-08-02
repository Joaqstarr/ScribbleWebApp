import Login from "../pages/login/page";
import {BrowserRouter, Route , Routes} from "react-router-dom"

export default function Layout() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Login/>} path="/" />
                    <Route element={<Login/>} path="/login" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}