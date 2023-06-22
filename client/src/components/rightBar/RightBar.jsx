import "../rightBar/rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Sugestion for you</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2012/10/10/05/17/abraham-lincoln-60558_1280.jpg"
                alt=""
              />
              <span>John Spark</span>
            </div>
            <div className="buttons">
              <button variant="contained" color="primary">
                follow
              </button>
              <button variant="contained" color="error">
                dismiss
              </button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2018/05/22/18/45/fantasy-3422153_1280.jpg"
                alt=""
              />
              <p>
                <span>Lucifer Morningstar</span> changed his profile picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2020/03/19/06/28/old-man-4946488_1280.jpg"
                alt=""
              />
              <p>
                <span>Lautaro Martinez</span> like your photo
              </p>
            </div>
            <span>5 minute ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2018/05/22/18/45/fantasy-3422153_1280.jpg"
                alt=""
              />
              <div className="online" />
              <span>Lucifer Morningstar</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2020/03/19/06/28/old-man-4946488_1280.jpg"
                alt=""
              />
              <div className="online" />
              <span>Lautaro Martinez</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
