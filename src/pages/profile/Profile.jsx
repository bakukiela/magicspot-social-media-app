import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/542705/pexels-photo-542705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/15511011/pexels-photo-15511011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="profileDetails">
          <div className="left">
            <a href="https://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="https://instagram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://github.com">
              <GitHubIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>John Drago</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Kanada</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>EN</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right"></div>
          <EmailOutlinedIcon />
          <MoreVertIcon />
        </div>
      <Posts />
      </div>
    </div>
  );
};

export default Profile;
