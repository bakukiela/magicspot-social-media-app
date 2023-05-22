import Post from "../post/Post"
import "../posts/posts.scss"

const Posts = () => {


  //Temporary data: 

  const posts = [
    {
      id: 1,
      name: "John Drago",
      userId: 1,
      profilePic: "https://images.pexels.com/photos/15511011/pexels-photo-15511011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione minus magni eveniet laudantium cupiditate odio ipsam dicta assumenda, vitae accusamus.",
      img: "https://images.pexels.com/photos/8513090/pexels-photo-8513090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      name: "John Drago",
      userId: 2,
      profilePic: "https://images.pexels.com/photos/15511011/pexels-photo-15511011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis incidunt veritatis consequuntur enim doloribus quibusdam tenetur nobis. Nemo libero obcaecati eligendi quaerat sed quia ipsum laboriosam eos iste, eum mollitia commodi illo corporis minima nobis, laudantium, adipisci dolorem et at. Quaerat fuga hic nulla corrupti optio blanditiis in? Repellat, totam.",
      img: "https://images.pexels.com/photos/7203724/pexels-photo-7203724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ]

  return (
    <div className="posts">
      {posts.map(post=> (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Posts
