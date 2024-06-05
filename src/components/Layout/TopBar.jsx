import logo from "../../assets/images/logo.png";
import {navLinks} from "../../data/data.jsx";
import {Link, useLocation} from "react-router-dom";
import {Menu} from "lucide-react";
import {useState} from "react";


const TopBar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <>
            <div
                className="sticky top-0 z-20 w-full lg:hidden flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl">
                <img src={logo} alt="logo" className="w-[150px]"/>

                <div className="nav-items flex gap-8 max-md:hidden">
                    {
                        navLinks.map((link, i) => (
                            <Link to={link.url} key={i.toString()} className={`flex gap-4 text-body-medium ${link.url===pathname ? "text-blue-1" : "text-grey-1"}`}>
                                {/*{link.icon}*/}
                                <p>{link.label}</p>
                            </Link>
                        ))
                    }
                </div>

                <div className="flex gap-4 items-center relative">
                    <Menu className="cursor-pointer md:hidden" onClick={()=>setDropdownMenu(!dropdownMenu)}/>
                    <img
                        alt="user 3"
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1288&amp;q=80"
                        className="relative cursor-pointer inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                    />
                    {
                      dropdownMenu && (
                            <div className="nav-items flex flex-col z-10 absolute top-10 right-6 shadow-xl p-5 bg-white rounded-lg gap-8 md:hidden">
                                {
                                    navLinks.map((link, i) => (
                                        <Link to={link.url} key={i.toString()} className={`flex gap-4 text-body-medium ${link.url===pathname ? "text-blue-1" : "text-grey-1"}`}>
                                            <p>{link.label}</p>
                                        </Link>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default TopBar;