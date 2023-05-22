import { useContext } from "react";
import "../stories/stories.scss";
import { AuthContext } from "../../context/authContext";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Stories = () => {
  
  const { currentUser } = useContext(AuthContext);
  
  // Temporaty data:
  const stories = [
    {
      id: 1,
      name: "Emil Wrocky",
      img: "https://images.pexels.com/photos/15126855/pexels-photo-15126855/free-photo-of-zachod-slonca-latanie-znane-miejsce-slonce.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Dimitry Vegas",
      img: "https://images.pexels.com/photos/1676671/pexels-photo-1676671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      name: "Nick Fredrich",
      img: "https://images.pexels.com/photos/16791418/pexels-photo-16791418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      name: "Juliette Stark",
      img: "https://images.pexels.com/photos/4652275/pexels-photo-4652275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePicture} alt="" />
        <span className="userName">Share your daily</span>
        <button><AddOutlinedIcon className="button" /></button>
      </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span className="userName">{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
