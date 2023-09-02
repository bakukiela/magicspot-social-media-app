import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { DefaultUserContext } from "../../context/defaultUserContext";
import { useState } from "react";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const defaultUser = useContext(DefaultUserContext);
  const location = useLocation();

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data, refetch } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  return (
    <div className="profile">
      {isLoading ? (
        "Loading data..."
      ) : (
        <>
          <div className="images">
            <img
              src={
                data.coverPic !== null
                  ? "/upload/" + data.coverPic
                  : defaultUser.coverPic
              }
              alt=""
              className="cover"
            />
            <img
              src={
                data.profilePic !== null
                  ? "/upload/" + data.profilePic
                  : defaultUser.profilePic
              }
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="profileDetails">
              <div className="left">
                <a href="https://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="https://instagram.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="https://github.com">
                  <GitHubIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name !== "" ? data.name : defaultUser.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>
                      {data.city !== null ? data.city : defaultUser.city}
                    </span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>
                      {data.lang !== null ? data.lang : defaultUser.lang}
                    </span>
                  </div>
                </div>
                {rIsLoading ? (
                  "Loading..."
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
