import LeftSideBar from "./LeftSideBar.jsx";
import TopBar from "./TopBar.jsx";
import {Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <>
           <div className="flex max-lg:flex-col text-grey-1">
               <LeftSideBar/>
               <TopBar/>
               <div className="flex-1">
                   <Outlet/>
               </div>
           </div>
        </>
    );
};

export default Layout;