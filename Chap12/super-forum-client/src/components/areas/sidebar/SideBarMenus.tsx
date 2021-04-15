import { faRegistered, faSignInAlt, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import Login from "../../auth/Login";
import Logout from "../../auth/Logout";
import Registration from "../../auth/Registration";
import "./SideBarMenus.css";
import { Link } from "react-router-dom";

const SideBarMenus = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const user = useSelector((state: AppState) => state.user);

    const onClickToggleRegister = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
        setShowRegister(!showRegister);
    };

    const onClickToggleLogin = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
        setShowLogin(!showLogin);
    };

    const onClickToggleLogout = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
        setShowLogout(!showLogout);
    };

    return (
        <React.Fragment>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="menu-name">
                        <Link to={`/userprofile/${user?.id}`}>{user?.userName}</Link>
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faRegistered} />
                    <Registration
                        isOpen={showRegister}
                        onClickToggle={onClickToggleRegister}
                    />
                    <span className="menu-name"
                        onClick={onClickToggleRegister}
                    >register</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span onClick={onClickToggleLogin} className="menu-name">
                        login
                    </span>
                    <Login isOpen={showLogin} onClickToggle={onClickToggleLogin} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span onClick={onClickToggleLogout} className="menu-name">
                        logout
                    </span>
                    <Logout isOpen={showLogout} onClickToggle={onClickToggleLogout} />
                </li>
            </ul>
        </React.Fragment>
    );
};

export default SideBarMenus;