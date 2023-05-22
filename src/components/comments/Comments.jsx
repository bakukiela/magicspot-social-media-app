import { useContext } from "react";
import "../comments/comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = () => {

  const { currentUser } = useContext(AuthContext);
  //Temoraty coments:

  const comments = [
    {
      id: 1,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, cupiditate.",
      name: "John Francis",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/15476607/pexels-photo-15476607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="comments" key={comments.id}>
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input type="text" placeholder="Tell what you think about that technology?" />
        <button>Comment</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="userInfo">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
