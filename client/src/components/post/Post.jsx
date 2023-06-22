import "../post/post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import Comments from "../comments/Comments";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = (e) => {
    e.preventDefault();
    mutation.mutate(data.includes(currentUser.id));
  };

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post"]);
        window.location.reload();
      },
    }
  );

  const handleDelete = (e) => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {!deleteButtonVisible && (
            <MoreHorizIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setMenuOpen(true);
                setDeleteButtonVisible(true);
              }}
            />
          )}
          {deleteButtonVisible && (
            <>
              <div className="buttonContainer">
                <IconButton className="deleteButton" onClick={handleDelete}>
                  <DeleteForeverIcon />
                </IconButton>
                <IconButton
                  className="cancelButton"
                  onClick={() => setDeleteButtonVisible(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item">
            <TextsmsOutlinedIcon onClick={() => setCommentOpen(!commentOpen)} />
            Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
