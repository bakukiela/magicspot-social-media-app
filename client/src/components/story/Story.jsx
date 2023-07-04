import "../story/story.scss";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import { makeRequest } from "../../axios";
import StoryModal from "../../modals/storyModal/StoryModal";

const Story = () => {
  // const [file, setFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

// TODO upload file:

  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await makeRequest.post("/upload", formData);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="modal">
      <div className="bar">
      {modalOpen && <StoryModal setModalOpen={setModalOpen} />}
        <div className="modules">
          <Link to="/">
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="base">
        {/* <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        /> */}
        <label htmlFor="file">
          <div className="element">
            <PhotoLibraryIcon onClick={()=> setModalOpen(true)} className="icon" />
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
