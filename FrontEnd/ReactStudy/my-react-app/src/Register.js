import { useState,useEffect,useRef } from "react";
import { DoRegister } from "./UserService";
import { useNavigate } from "react-router-dom";
import { UploadPicture } from "./UserService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserDto from './Models/User.js'


const Register = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [passwordRepeat,setPasswordRepeat] = useState('');
    const[email,setEmail] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const[isPending,setIsPending] = useState(false);  
    const [file, setFile] = useState(null);
    const [fileName,setFileName] = useState('');
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const[role,setRole] = useState('user');
    const[adress,setAdress] = useState('');
    const[passError,setPassError] = useState('');
    const [filePreview,setFilePreview] = useState(null)
    const filePreviewRef = useRef();

    useEffect(() => {
        filePreviewRef.current.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEX////p6Oj19fXy8fHu7u7r6er5+fn8/Pzv7+/r6+vn5ubz8/P6+fr9/P0SPnzDAAACrUlEQVR4nO3c4ZaTMBBA4QKVlFbf/3V1dXu2ZGZCspLOwLnf37K412ASoMfLBQAAAAAAAAAAAAAAAAAAAAAAAAAAACXzGELHwusQwukLf1BIIYXuKKSQQn8UUlhbeLukN/rpUvhO5y+cHQqXjn+OROFeKOyHwr1Q+D/SeFuW65j0T09QOD3P+1A/PnxhWl5OrA3j0QvTsKIccfTC7J7lKo84eOE8ZObiIQcsnPLCSRxy8MIlL5TnPnZhygOHQUynFO6lU6G8SoMXNr/BFIVyuQhVON9bH3CMeaH8OwpVuDQ/w/mVF8pDIhWO+iAUZYOo/HSkQvOXLFmt+XK9D1X4HI7vJ6o/GacwlX9RW7ot94+zTvotcJzCx9cBcvtcltI8J+MWP07hanvSmlgSpvA2dEqMUpjf6FnXXLsoheL94m6JQQrFvbr+VOnysdluvIKDFIodtJn4aP1HGqNQDqFxMf+dcu9NC2aMQmUIB/XB2ed5tN2ZJUShuAcyE2fzE1OEQnmn/iTGarHOYYtQ+LJf20h8GWxrrhUCFIq7WDNx/eCpckoNULjer5USs+e/dVOqf6HyRNDoEGtKVaJ/YXkIh5erUX5zrGbVcC9UF3t1qLQjK1YN98Kar/T9G0V1TdmeUr0LK4bwM9FaU7YSvQvNxT7PsCekjVXDudDar8lE8abwS3lKdS6sDSzTv4QRorB6CDeU3gX4Fu4U+GfVsOcb18LClruVvWp4Fm7t19pYU6pn4Y5DWEj0LCwsAN+irxpnKtRXjVMVqqvGuQq3HjafoDDYt016FA7iof/pCsWqccLC+3pKdS1cOlktjN53wP1RuBcK+6FwLxT241L41v84aXIo9EMhhRT6o5BCCv1RSGHJOEVQfFkMAAAAAAAAAAAAAAAAAAAAAAAAAACw6Tc89C+gXlz0SwAAAABJRU5ErkJggg==";
            
        }, []);
    useEffect(() => {
        setPassError('');
    }, [email,password,username,passwordRepeat]);


    const navigate = useNavigate();
    
    

    const handleSubmit = (e) =>
        {
            e.preventDefault();
            
            console.log(file);
            const form = new FormData();
            form.append("usernamePicture",username)
            form.append("formFile",file)
            form.append("fileName",fileName)
            

            for (var key of form.entries()) {
                console.log(key[0] + ', ' + key[1] + ',' + key[2])
            }
            const user = new UserDto(username,email,password,name,lastName,adress,role,birthDate);
           

               
            if (password === passwordRepeat && password.length >= 8)
                {
                    
                    DoRegister(user)
                    .then(function (response) {
                        console.log('registered')
                        UploadPicture(form);
                        navigate('/login');
                    })
                    .catch(function (error) {
                        setPassError(error.response.data)
                    });                    
                        
                    

                }
            else if(password !== passwordRepeat)
            {
                setPassError(" Password and Confirm Password field must contain the same password!");
                return
            }    
            
            else if(password.length < 8) 
            {
                setPassError(" Password must be at least 8 characters long!");
                return
            
            }
        }
    return (
            
    <div className="create">
        <label className="pass-error-label">{passError}</label>
        <h2>Sign up</h2>
        <br />
        <form onSubmit={handleSubmit} >
            
                <label>Username :</label>
                <input 
                    type="text" 
                    required
                    value = {username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

              <label> Password :</label>
            
            <input type="password"
                required
                value = {password}
                onChange={(e)=>setPassword(e.target.value)} 
            ></input>
                        
            <label>Confirm Password :</label>
            
            <input type="password"
                required
                value = {passwordRepeat}
                onChange={(e)=>setPasswordRepeat(e.target.value)} 
            ></input>
            <label>email:</label>
            <input type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            >  
            </input>           
            <label >Name :</label>
            <input type="text"
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
            >  
            </input>
            <label >Last Name :</label>
            <input type="text"
                required
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
            >  
            </input>
            <label >Address :</label>
            <input type="text"
                required
                value={adress}
                onChange={(e)=>setAdress(e.target.value)}
            >  
            </input>
            <label>Role:</label>
                <select
                    required
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                >
                    <option value="user">user</option>
                    <option value="driver">driver</option>
                </select>
            
            <label>BirthDate:</label>
            <br />
            <DatePicker               
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
           />
           <br />
           <label>New Profile Picture :</label>
           <label style={{marginLeft:"170px"}}>Image Preview :</label>
           
           <div className="profile-picture-update-div">                    
                  <input type="file"
                    id="input-file"
                    required
                     onChange={(e)=>{
                         setFile(e.target.files[0])
                         setFileName(e.target.files[0].name)
                         setFilePreview(URL.createObjectURL(e.target.files[0]))
                     }}
                   >
                 </input>
                 <div className="img-preview-div">
                    <br />
                    <img style ={{height:"150px", width:"150px", marginLeft:"20px"}} src={filePreview} ref={filePreviewRef}/>
                  </div>
             </div>
             <br />
             {isPending?<button disabled>Registering...</button>:<button>Sign up</button>}      
        </form>
          
        
    </div>
            
    );
}
 
export default Register
;