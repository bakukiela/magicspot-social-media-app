import "../navBar/navBar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const NavBar = ({ defaultUser }) => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navBar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>MagicSpot</span>
        </Link>
        <IconButton
          className="IconButtons"
          onClick={toggle}
          style={{ cursor: "pointer" }}
        >
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
            <img src={"/upload/" + currentUser.profilePic} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
