import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
    const [tittle,setTittle] = useState('');
    const [body,setBody] = useState('');
    const[author,setAuthor] = useState('mario');
    const[isPending,setIsPending] = useState(false);
    const[img,setImg] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {tittle,body,author};

        setIsPending(true)

        axios.post('http://localhost:8000/blogs',blog)
        .then(() =>{
            console.log('new blog added');
            setIsPending(false)
            navigate('/');
        })
        .catch((error) => {
            console.log(error)
        })

    }

    return (  
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit} >

            <label>Blog picture :</label>
                <input 
                    type="file" 
                    required
                    value = {img}
                    onChange={(e)=>setImg(e.target.value)}
                />
                 <img src={img} alt="Uploaded content"/>
                <label>Blog tittle :</label>
                <input 
                    type="text" 
                    required
                    value = {tittle}
                    onChange={(e)=>setTittle(e.target.value)}
                />
                <label>Blog body :</label>
                <textarea
                    required
                    value = {body}
                    onChange={(e)=>setBody(e.target.value)} 
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                 {isPending?<button disabled>Adding...</button>:<button>Add Blog</button>}                
            </form>
                {console.log({img})}
        </div>
    );
}
 
export default Create;