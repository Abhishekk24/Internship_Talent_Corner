import React, { useState } from "react";
import Talent from "../Images/talentlogo.png";
import Profile from "../Images/profile.png";
import Dashboard from "../Images/dashboard.svg";
import Transactions from "../Images/transactions.svg";
import Performance from "../Images/performance.svg";


import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Sidebar = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const handleIconClick = (path) => {
        if (path === "/logout") {
            signOut(auth)
                .then(() => {
                    // Log out successful
                    navigate("/"); // Redirect to the home page
                })
                .catch((error) => {
                    // An error happened
                    console.error(error);
                });
        } else {
            if (closeMenu || !closeMenu) {
                navigate(path);
            }
        }
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div className={closeMenu === false ? "logoContainer" : "logoContainer active"}>
                <img src={Talent} alt="icon" className="logo" />
                
            </div>
            <div className={closeMenu === false ? "burgerContainer" : "burgerContainer active"}>
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div className={closeMenu ? "profileContainer " : "profileContainer active"}>
                <img src={Profile} alt="profile" className="profile" />

                
                    <div className="profileContents">
                        <p className="name">Hello, {props.name}👋</p>
                        <p>{props.email}</p>
                    </div>
                
            </div>



            <div className={closeMenu === false ? "contentsContainer" : "contentsContainer active"}>
                <ul>
                    <li className={location.pathname === "/dashboard" ? "active" : ""}>
                        <div onClick={() => handleIconClick("/dashboard")}>
                            <img src={Dashboard} alt="dashboard" />
                            {!closeMenu && <span className="label">Dashboard</span>}
                            {closeMenu && <span className="text">Dashboard</span>}
                        </div>
                    </li>
              
              
                    <li className={location.pathname === "/filter" ? "active" : ""}>
                        <div onClick={() => handleIconClick("/filter")}>
                            <img src={Performance} alt="filter" />
                            {!closeMenu && <span className="label">Filters</span>}
                            {closeMenu && <span className="text">Filters</span>}
                        </div>
                    </li>
                 
                    <li className={location.pathname === "/logout" ? "active" : ""}>
                        <div onClick={() => handleIconClick("/logout")}>
                            <img src={Transactions} alt="logout" />
                            {!closeMenu && <span className="label">Logout</span>}
                            {closeMenu && <span className="text">Logout</span>}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;