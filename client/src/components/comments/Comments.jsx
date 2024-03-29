import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { DefaultUserContext } from "../../context/defaultUserContext";
// import { useMediaQuery } from "@mui/material";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const [showFullComments, setShowFullComments] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const defaultUser = useContext(DefaultUserContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const toggleShowFullComments = () => {
    setShowFullComments(!showFullComments);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePic !== null
              ? "/upload/" + currentUser.profilePic
              : defaultUser.profilePic
          }
          alt=""
        />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>
                  {showFullComments
                    ? comment.desc
                    : comment.desc.length > 17
                    ? comment.desc.slice(0, 17) + "..."
                    : comment.desc}
                </p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
      <button className="showMore" onClick={toggleShowFullComments}>
        {showFullComments ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default Comments;
