`use client`
import Login from "../login/page";
import Host from "../host/page"
import {BrowserRouter, Route , Routes} from "react-router-dom"

export default function Layout() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Login/>} path="/login" />
                    <Route element={<Host/>} path="/host" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}