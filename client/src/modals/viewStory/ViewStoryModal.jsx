import React, { useState } from "react";
import "../viewStory/viewStoryModal.scss";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

const ViewStoryModal = ({
  setView,
  story,
  handlePreviousStory,
  handleNextStory,
}) => {
  const [showButtons, setShowButtons] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setView(false);
  };

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  return (
    <div className="view-story">
      <div
        className="view-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={"/upload/" + story.img} alt="" className="stories-img" />
        {showButtons && (
          <>
            <IconButton className="story-button" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <IconButton className="back-button" onClick={handlePreviousStory}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton className="next-button" onClick={handleNextStory}>
              <ArrowForwardIosIcon />
            </IconButton>
            <div className="nameOverlay">
              <Link
                to={`/profile/${story.userId}`}
                style={{ textDecoration: "none" }}
              >
                <span className="storyName">{story.name}</span>
              </Link>
            </div>
          </>
        )}
        <div className="view-elements" key={story.id}></div>
      </div>
    </div>
  );
};

export default ViewStoryModal;
