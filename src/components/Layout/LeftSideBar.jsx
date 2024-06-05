import logo from "../../assets/images/logo.png";
import {navLinks} from "../../data/data.jsx";
import {Link, useLocation} from "react-router-dom";
import { CircleUser } from 'lucide-react';

const LeftSideBar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <>
          <div className="h-screen sticky left-0 top-0 p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
              <img src={logo} alt="logo" className="w-[150px]"/>

              <div className="nav-items flex flex-col gap-12">
                  {
                      navLinks.map((link,i)=>(
                          <Link to={link.url} key={i.toString()} className={`flex gap-4 text-body-medium ${link.url === pathname ? "text-blue-1" : "text-grey-1"}`} >
                              {link.icon}
                              <p>{link.label}</p>
                          </Link>
                      ))
                  }
              </div>

              <div className="flex gap-4 text-body-medium items-center">
                  <img
                      alt="user 3"
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1288&amp;q=80"
                      className="relative cursor-pointer inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                  />
                  <p>Edit Profile</p>
              </div>

          </div>

        </>
    );
};

export default LeftSideBar;