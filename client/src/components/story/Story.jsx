import "../story/story.scss";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IconButton } from "@mui/material";
import StoryModal from "../../modals/storyModal/StoryModal";

const Story = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="modal">
      <div className="bar">
        {modalOpen && <StoryModal setModalOpen={setModalOpen} />}
        <div className="modules">
          <Link to="/">
            <IconButton>
              <CloseIcon className="closeIcon" />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="base">
        <label htmlFor="file">
          <div className="element">
            <PhotoLibraryIcon
              onClick={() => setModalOpen(true)}
              className="icon"
            />
            <span>Create picture relation</span>
          </div>
        </label>
        <div className="element">
          <TextFieldsIcon className="icon" />
          <span>Create text relation</span>
        </div>
      </div>
    </div>
  );
};

export default Story;
