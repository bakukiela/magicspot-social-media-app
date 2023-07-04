import "../navBar/navBar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { DefaultUserContext } from "../../context/defaultUserContext";

const NavBar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const defaultUser = useContext(DefaultUserContext);

  return (
    <div className="navBar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>MagicSpot</span>
        </Link>
        <Link to={`/profile/${currentUser.id}`}>
          <IconButton className="IconButtons">
            <AccountCircleIcon className="profileIcon" />
          </IconButton>
        </Link>
        <IconButton className="IconButtons" onClick={toggle}>
          {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="right">
        <IconButton className="IconButtons">
          <EmailOutlinedIcon />
        </IconButton>
        <IconButton className="IconButtons">
          <NotificationsOutlinedIcon />
        </IconButton>
        <div className="user">
          <Link to={`/profile/${currentUser.id}`}>
            <img
              src={
                currentUser.profilePic !== null
                  ? "/upload/" + currentUser.profilePic
                  : defaultUser.profilePic
              }
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
