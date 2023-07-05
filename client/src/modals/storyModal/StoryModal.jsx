import "../storyModal/storyModal.scss";
import { useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "react-query";

const StoryModal = ({ setModalOpen }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

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
    setImage(file);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (image) imgUrl = await upload();
    mutation.mutate({text, img: imgUrl });
    setImage(null);
    setText("");
  };

  return (
    <div className="storyModal">
      <div className="frame">
        <div className="elements">
          <IconButton onClick={() => setModalOpen(false)}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <label htmlFor="file">
          <div className="img">
            {image && (
              <img alt="" src={URL.createObjectURL(image)} />
            )}
            <input type="file" id="file" style={{display:"none"}} onChange={handleImageChange} />
          </div>
        </label>
        <div className="tools">
          <div className="tool">X</div>
          <div className="tool">Y</div>
          <div className="tool">Z</div>
        </div>
        {/* <div className="textArea">
          <textarea value={text} onChange={handleTextChange} placeholder="Wprowadź tekst..." />
        </div> */}
        {/* <div>
          <button onClick={handleSubmit}>Wyślij</button>
        </div> */}
      </div>
    </div>
  );
};

export default StoryModal;
