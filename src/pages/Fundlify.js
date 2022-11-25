import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import './styles/fundlify.css';

const Fundlify = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
           <HomePage />
        </div>
    );
}

export default Fundlify;