import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import CreateCollectionPage from "./pages/CreateCollectionPage.jsx";
import Layout from "./components/Layout/Layout.jsx";


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<DashboardPage/>}/>
                        <Route path="collections" element={<CreateCollectionPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;