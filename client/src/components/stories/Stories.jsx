import "./stories.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import ViewStoryModal from "../../modals/viewStory/ViewStoryModal";
import { DefaultUserContext } from "../../context/defaultUserContext";

const Stories = () => {
  const [viewStory, setViewStory] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userStories, setUserStories] = useState([]);
  const [userImageContainers, setUserImageContainers] = useState({});

  const { currentUser } = useContext(AuthContext);
  const defaultUser = useContext(DefaultUserContext);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  useEffect(() => {
    if (data) {
      const containers = {};

      data.forEach((item) => {
        if (!containers[item.userId]) {
          containers[item.userId] = [];
        }
        containers[item.userId].push(item);
      });

      Object.keys(containers).forEach((user) => {
        containers[user].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      });
      setUserImageContainers(containers);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setUserStories(data);
    }
  }, [data]);

  const handleStoryClick = (story, index) => {
    console.log("Object:", story);
    console.log("Index:", index);
    setSelectedStory(story);
    setCurrentIndex(index);
    setViewStory(true);
  };

  const handleNextStory = () => {
    if (data && data.length > 0) {
      const nextIndex = (currentIndex + 1) % data.length;
      setSelectedStory(data[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  useEffect(() => {
    const interval = setInterval(handleNextStory, 500000);

    return () => clearInterval(interval);
  }, [currentIndex, data]);

  const handlePreviousStory = () => {
    if (data && data.length > 0) {
      const previousIndex = (currentIndex - 1 + data.length) % data.length;
      setSelectedStory(data[previousIndex]);
      setCurrentIndex(previousIndex);
    }
  };

  return (
    <div className="stories">
      <div className="story">
        <img
          src={
            currentUser.profilePic !== null
              ? "/upload/" + currentUser.profilePic
              : defaultUser.profilePic
          }
          alt=""
        />
        <span className="userName">{currentUser.name}</span>
        <Link to={`/story/${currentUser.id}`}>
          <div className="addStoryOverlay">
            <span>Add new story</span>
            <button>+</button>
          </div>
        </Link>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : Object.keys(userImageContainers).map((container) => (
            <div
              className="story"
              onClick={() =>
                handleStoryClick(userImageContainers[container][0], 0)
              }
              key={container}
            >
              <img
                src={"/upload/" + userImageContainers[container][0].img}
                alt=""
              />
              <div className="storyOverlay">
                <span className="userName">
                  {userImageContainers[container][0].name}
                </span>
              </div>
            </div>
          ))}
      {viewStory && (
        <ViewStoryModal
          handlePreviousStory={handlePreviousStory}
          handleNextStory={handleNextStory}
          story={selectedStory}
          setViewStory={setViewStory}
        />
      )}
    </div>
  );
};

export default Stories;
