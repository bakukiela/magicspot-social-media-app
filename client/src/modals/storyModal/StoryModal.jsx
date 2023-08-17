import "../storyModal/storyModal.scss";
import { useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";

const StoryModal = ({ setModalOpen }) => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ img: imgUrl });
    setFile(null);
    navigate("/");
  };

  return (
    <div className="storyModal">
      <div className="frame">
        <div className="elements">
          <IconButton onClick={() => setModalOpen(false)}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="editBar">
          <label htmlFor="file">
            <div className="img">
              {file && <img alt="" src={URL.createObjectURL(file)} />}
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </label>
          <div className="tools">
            <IconButton
              className="tool"
              onClick={() => document.getElementById("file").click()}
            >
              <UploadFileIcon />
            </IconButton>
            <IconButton className="tool" onClick={handleSubmit}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
