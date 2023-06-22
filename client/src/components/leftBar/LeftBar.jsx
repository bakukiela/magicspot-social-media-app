import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "../leftBar/leftBar.scss"

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src="" alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src="" alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src="" alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar
