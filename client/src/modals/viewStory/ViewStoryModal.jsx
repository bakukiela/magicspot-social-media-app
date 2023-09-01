import React, { useContext, useState } from "react";
import "../viewStory/viewStoryModal.scss";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const ViewStoryModal = ({
  setViewStory,
  story,
  handlePreviousStory,
  handleNextStory,
}) => {
  const [showButtons, setShowButtons] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);
  const [isListExpanded, setListExpanded] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (storyId) => {
      return makeRequest.delete("/stories/" + storyId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
        window.location.reload();
      },
    }
  );

  const handleDelete = (e) => {
    deleteMutation.mutate(story.id);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setViewStory(false);
  };

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const toggleList = () => {
    setListExpanded(!isListExpanded);
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
            <IconButton
              className="more-button"
              style={
                currentUser.id === story.userId
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <MoreVertIcon onClick={toggleList} />
            </IconButton>
            {isListExpanded && (
              <div className="expanded-list">
                <Link to={`/story/${currentUser.id}`}>
                  <IconButton>
                    <AddPhotoAlternateIcon className="list-buttons" />
                  </IconButton>
                </Link>
                <IconButton onClick={handleDelete}>
                  <DeleteForeverIcon className="list-buttons" />
                </IconButton>
                <IconButton onClick={toggleList}>
                  <CloseIcon className="list-buttons" />
                </IconButton>
              </div>
            )}
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
