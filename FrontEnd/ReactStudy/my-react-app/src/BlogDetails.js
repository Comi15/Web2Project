import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {data: blog, error, isPending} = useFetch("http://localhost:8000/blogs/" + id);
    const handleClick = () => {
        axios.delete("http://localhost:8000/blogs/" + id)
        .then(() => {
            navigate("/")
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    return (  
        <div className="blog-details">
           {isPending && <div>Loading...</div>}
           {error && <div>{error}</div>}
           {blog && (
            <article>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleClick}>delete</button>
            </article>
           )}
        </div>
    );
}


export default BlogDetails;