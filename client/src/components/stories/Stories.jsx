import "../stories/stories.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  // const [file, setFile] = useState(null);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  // const queryClient = useQueryClient();

  // const uploadFile = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await makeRequest.post("/upload", formData);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const mutation = useMutation(
  //   (newStory) => {
  //     return makeRequest.post("/stories", newStory);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["stories"]);
  //     },
  //   }
  // );

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   let imgUrl = "";
  //   if (file) imgUrl = await uploadFile();
  //   mutation.mutate({ img: imgUrl });
  //   setFile(null);
  // };

  // Temporaty data:
  // const stories = [
  //   {
  //     id: 1,
  //     name: "Emil Wrocky",
  //     img: "https://images.pexels.com/photos/15126855/pexels-photo-15126855/free-photo-of-zachod-slonca-latanie-znane-miejsce-slonce.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     name: "Dimitry Vegas",
  //     img: "https://images.pexels.com/photos/1676671/pexels-photo-1676671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     name: "Nick Fredrich",
  //     img: "https://images.pexels.com/photos/16791418/pexels-photo-16791418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     name: "Juliette Stark",
  //     img: "https://images.pexels.com/photos/4652275/pexels-photo-4652275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];
  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span className="userName">{currentUser.name}</span>
        <Link to={`/story/${currentUser.id}`}>
          <AddOutlinedIcon className="button" />
        </Link>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span className="userName">{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
