import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import CollectionCreatePage from "./pages/CollectionCreatePage.jsx";
import Layout from "./components/Layout/Layout.jsx";
import CollectionListPage from "./pages/CollectionListPage.jsx";
import CollectionEditPage from "./pages/CollectionEditPage.jsx";


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<DashboardPage/>}/>
                        <Route path="collections" element={<CollectionListPage/>} />
                        <Route path="collections/new" element={<CollectionCreatePage/>} />
                        <Route path="collections/:id" element={<CollectionEditPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;