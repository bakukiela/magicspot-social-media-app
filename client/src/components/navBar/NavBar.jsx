import "../navBar/navBar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { DefaultUserContext } from "../../context/defaultUserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ClearIcon from "@mui/icons-material/Clear";
import { useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";

const NavBar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const defaultUser = useContext(DefaultUserContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    "users",
    () =>
      makeRequest.get("users").then((res) => {
        return res.data;
      }),
    {
      onSuccess: (newData) => {
        queryClient.setQueryData("users", newData);
      },
    }
  );

  let filteredUsers = [];

  if (data) {
    filteredUsers = data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  console.log(filteredUsers);

  const handleInputChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setShowList(inputValue !== "");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showList && !e.target.closest(".userList")) {
        setShowList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showList]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleAlert = () => {
    alert("This functionality is not available yet!");
  };

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
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onClick={() => setShowList(true)}
          onChange={handleInputChange}
        />
        {showList && (
          <div className="userList">
            {error ? (
              "Something went wrong"
            ) : isLoading ? (
              "Loading..."
            ) : (
              <ul>
                {filteredUsers.map((user) => (
                  <li key={user.id}>
                    <Link
                      to={`/profile/${user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {user.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="right">
        <IconButton className="IconButtons" onClick={handleAlert}>
          <EmailOutlinedIcon />
        </IconButton>
        <IconButton className="IconButtons" onClick={handleAlert}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <div className="user">
          <img
            onClick={toggleDropdown}
            src={
              currentUser.profilePic !== null
                ? "/upload/" + currentUser.profilePic
                : defaultUser.profilePic
            }
            alt=""
          />
          {isDropdownOpen && (
            <div
              className={`dropdownContent ${isDropdownOpen ? "open" : ""}`}
              onClick={closeDropdown}
            >
              <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="menuItem">
                  <AccountBoxIcon />
                  Profile
                </div>
              </Link>
              <hr />
              <div style={{ textDecoration: "none" }} onClick={handleLogout}>
                <div className="menuItem">
                  <LogoutIcon />
                  Logout
                </div>
              </div>
              <hr />
              <div
                className="menuItem"
                onClick={() => setIsDropdownOpen(false)}
                style={{ cursor: "pointer" }}
              >
                <ClearIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
