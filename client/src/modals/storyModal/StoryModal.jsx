import "../storyModal/storyModal.scss";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StoryModal = ({ setModalOpen }) => {
  return (
    <div className="storyModal">
      <div className="frame">
        <div className="elements">
          <IconButton onClick={() => setModalOpen(false)}><ArrowBackIcon /></IconButton>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
