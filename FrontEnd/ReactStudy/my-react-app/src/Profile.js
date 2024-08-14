import { GetUserById,GetPictureName } from "./UserService";
import { useState,useEffect,useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate,useLocation } from "react-router-dom";
import { DoUserUpdate,UpdatePicture } from "./UserService";
import UpdateDto from  "./Models/UpdateDto"


const Profile = () => {

    const {user,verified} = GetUserById(localStorage.getItem('userId'))

        useEffect(() => {
        inputImg.current.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEX////p6Oj19fXy8fHu7u7r6er5+fn8/Pzv7+/r6+vn5ubz8/P6+fr9/P0SPnzDAAACrUlEQVR4nO3c4ZaTMBBA4QKVlFbf/3V1dXu2ZGZCspLOwLnf37K412ASoMfLBQAAAAAAAAAAAAAAAAAAAAAAAAAAACXzGELHwusQwukLf1BIIYXuKKSQQn8UUlhbeLukN/rpUvhO5y+cHQqXjn+OROFeKOyHwr1Q+D/SeFuW65j0T09QOD3P+1A/PnxhWl5OrA3j0QvTsKIccfTC7J7lKo84eOE8ZObiIQcsnPLCSRxy8MIlL5TnPnZhygOHQUynFO6lU6G8SoMXNr/BFIVyuQhVON9bH3CMeaH8OwpVuDQ/w/mVF8pDIhWO+iAUZYOo/HSkQvOXLFmt+XK9D1X4HI7vJ6o/GacwlX9RW7ot94+zTvotcJzCx9cBcvtcltI8J+MWP07hanvSmlgSpvA2dEqMUpjf6FnXXLsoheL94m6JQQrFvbr+VOnysdluvIKDFIodtJn4aP1HGqNQDqFxMf+dcu9NC2aMQmUIB/XB2ed5tN2ZJUShuAcyE2fzE1OEQnmn/iTGarHOYYtQ+LJf20h8GWxrrhUCFIq7WDNx/eCpckoNULjer5USs+e/dVOqf6HyRNDoEGtKVaJ/YXkIh5erUX5zrGbVcC9UF3t1qLQjK1YN98Kar/T9G0V1TdmeUr0LK4bwM9FaU7YSvQvNxT7PsCekjVXDudDar8lE8abwS3lKdS6sDSzTv4QRorB6CDeU3gX4Fu4U+GfVsOcb18LClruVvWp4Fm7t19pYU6pn4Y5DWEj0LCwsAN+irxpnKtRXjVMVqqvGuQq3HjafoDDYt016FA7iof/pCsWqccLC+3pKdS1cOlktjN53wP1RuBcK+6FwLxT241L41v84aXIo9EMhhRT6o5BCCv1RSGHJOEVQfFkMAAAAAAAAAAAAAAAAAAAAAAAAAACw6Tc89C+gXlz0SwAAAABJRU5ErkJggg==";
            
        }, []);
    useEffect(() => {
        
        GetPictureName(localStorage.getItem('username'))
        .then(function (response) {
            setProfileImageName(response.data);
            console.log('a')
         })
        .catch(function (error) {
        console.log(error);
        }[pictureUpdated]);

    });
    console.log(user);
    const [currentPassword,setCurrentPassword] = useState(null);
    const [newPassword,setNewPassword] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const[username,SetUsername] = useState(null);
    const[email,setEmail] = useState(null);
    const[isPending,setIsPending] = useState(false);  
    const [file, setFile] = useState(null);
    const [fileName,setFileName] = useState('');
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(null);
    const[adress,setAdress] = useState(null);
    const[passError,setPassError] = useState('');
    const navigate = useNavigate();
    const[nameChange,setNameChange] = useState(false);
    const[lastNameChange,setLastNameChange] = useState(false);
    const[adressChange,setAdressChange] = useState(false);
    const[birthDateChange,setBirthDateChange] = useState(false);
    const[profileImageName,setProfileImageName] = useState();
    const[pictureUpdated,setPictureUpdated] = useState(false);
    const[updateSucc,setUpdateSucc] = useState('')

    const userId = localStorage.getItem('userId');
    const [filePreview,setFilePreview] = useState(null)
    const inputFile = useRef(null);
    const inputImg = useRef(null)


       useEffect(() => {
        if(nameChange === false)
            {
                setName(user.name)
            }
        if(lastNameChange === false)
            {
                setLastName(user.lastName)
            }
        if (adressChange === false)
            {
                setAdress(user.adress)
            }

        if (birthDateChange === false)
            {
                setBirthDate(user.birthDate)
            }
            setEmail(user.email)
            SetUsername(user.username)
           
        
       });

       useEffect(() => {
        setPassError('');
        setUpdateSucc('');
    }, [newPassword,currentPassword,name,lastName,adress,birthDate]);
    
    const handleSubmit = (e) => 
    {
        e.preventDefault();
       

        const form = new FormData();
            form.append("usernamePicture",localStorage.getItem('username'))
            form.append("formFile",file)
            form.append("fileName",fileName)
        const updateDto = new UpdateDto(currentPassword,newPassword,name,lastName,adress,birthDate)
        console.log(updateDto)
        if (currentPassword !== null && newPassword !== null)
            {
                if(currentPassword && newPassword && currentPassword === newPassword)
                    {
                        setPassError('Your new password can not be the same as your old password');
                        return;
                    }
            }

         if(newPassword && newPassword.length < 8)
            {
                setPassError('New password must be at least 8 characters long');
                return;
            }

        DoUserUpdate(userId,updateDto)
            .then(function (response) {
                console.log(response);
                setPassError(response.data.error)
            if(response.data.error === '')
            {
                    setUpdateSucc('Updated your profile successfully.')
            }
            else
            {
                setUpdateSucc('')

            }

            })
            .catch(function (error) {
                setPassError(error.response.data);
                console.log(error);
            });
        UpdatePicture(form)
        .then(function (response) {
            console.log(response.data);
            if(passError === '')
                setUpdateSucc('Updated your profile successfully.')
                
            setPictureUpdated(response.data)
            
            
        })
        .catch(function (error) {
            setPassError(error.response.data);
            console.log(error);
        });
        inputFile.current.value = "";
        inputImg.current.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEX////p6Oj19fXy8fHu7u7r6er5+fn8/Pzv7+/r6+vn5ubz8/P6+fr9/P0SPnzDAAACrUlEQVR4nO3c4ZaTMBBA4QKVlFbf/3V1dXu2ZGZCspLOwLnf37K412ASoMfLBQAAAAAAAAAAAAAAAAAAAAAAAAAAACXzGELHwusQwukLf1BIIYXuKKSQQn8UUlhbeLukN/rpUvhO5y+cHQqXjn+OROFeKOyHwr1Q+D/SeFuW65j0T09QOD3P+1A/PnxhWl5OrA3j0QvTsKIccfTC7J7lKo84eOE8ZObiIQcsnPLCSRxy8MIlL5TnPnZhygOHQUynFO6lU6G8SoMXNr/BFIVyuQhVON9bH3CMeaH8OwpVuDQ/w/mVF8pDIhWO+iAUZYOo/HSkQvOXLFmt+XK9D1X4HI7vJ6o/GacwlX9RW7ot94+zTvotcJzCx9cBcvtcltI8J+MWP07hanvSmlgSpvA2dEqMUpjf6FnXXLsoheL94m6JQQrFvbr+VOnysdluvIKDFIodtJn4aP1HGqNQDqFxMf+dcu9NC2aMQmUIB/XB2ed5tN2ZJUShuAcyE2fzE1OEQnmn/iTGarHOYYtQ+LJf20h8GWxrrhUCFIq7WDNx/eCpckoNULjer5USs+e/dVOqf6HyRNDoEGtKVaJ/YXkIh5erUX5zrGbVcC9UF3t1qLQjK1YN98Kar/T9G0V1TdmeUr0LK4bwM9FaU7YSvQvNxT7PsCekjVXDudDar8lE8abwS3lKdS6sDSzTv4QRorB6CDeU3gX4Fu4U+GfVsOcb18LClruVvWp4Fm7t19pYU6pn4Y5DWEj0LCwsAN+irxpnKtRXjVMVqqvGuQq3HjafoDDYt016FA7iof/pCsWqccLC+3pKdS1cOlktjN53wP1RuBcK+6FwLxT241L41v84aXIo9EMhhRT6o5BCCv1RSGHJOEVQfFkMAAAAAAAAAAAAAAAAAAAAAAAAAACw6Tc89C+gXlz0SwAAAABJRU5ErkJggg==";
    }

    const handleDiscard = (e) => {
        navigate('/dashboard')
    }
    return ( 
         
        <div className="create">
        <h2>My Profile</h2>
        <br />
          <img className ='profile-pic'src={`https://localhost:44336/images/${profileImageName}`} />
        
        <br />
        <form >
                <label>Account Status : {verified}</label>
                <br />
                <br />
                <label>Username :</label>
                <input 
                    type="text" 
                    required
                    value = {username}
                    readOnly
                />
                
              <label>Current Password :</label>
            
            <input type="password"
                value = {currentPassword}
                onChange={(e)=>setCurrentPassword(e.target.value)} 
            ></input>
                        
            <label>New Password :</label>
            <input type="password"
                value = {newPassword}
                onChange={(e)=>setNewPassword(e.target.value)} 
            ></input>
            <label>email:</label>
            <input type="email"
                required
                readOnly
                value={user.email}               
            >  
            </input>           
            <label >Name :</label>
            <input type="text"
                required
                value={name}
                onChange={(e)=>{
                    setName(e.target.value)
                    setNameChange(true)
                }}
            >  
            </input>
            <label >Last Name :</label>
            <input type="text"
                required
                value={lastName}
                onChange={(e)=>{
                    setLastName(e.target.value)
                    setLastNameChange(true)

                }}
            >  
            </input>
            <label >Address :</label>
            <input type="text"
                required
                value={adress}
                onChange={(e)=>{
                    setAdress(e.target.value)
                    setAdressChange(true)

                }}
            >  
            </input>
            
            <label>BirthDate:</label>
            <br />
            <DatePicker               
                selected={birthDate}
                onChange={(date) => {
                    setBirthDate(date)
                    setBirthDateChange(true)

                }}
           />
           <br />
           
           <label>New Profile Picture :</label>
           <label style={{marginLeft:"170px"}}>Image Preview :</label>
           
           <div className="profile-picture-update-div">                    
                  <input type="file"
                    id="input-file"
                    ref={inputFile}
                     onChange={(e)=>{
                         setFile(e.target.files[0])
                         setFileName(e.target.files[0].name)
                         setFilePreview(URL.createObjectURL(e.target.files[0]))
                     }}
                   >
                 </input>
                 <div className="img-preview-div">
                    <br />
                    <img style ={{height:"150px", width:"150px", marginLeft:"20px"}} src={filePreview} ref={inputImg}/>
                  </div>
             </div>
             <br />
            <div className="buttons-div">
                <button onClick={handleSubmit   }>Save Changes</button>
                <button onClick={handleDiscard}>Discard Changes</button>
            </div>        
        </form>         
        <label>{updateSucc}</label>
        <label className="pass-error-label">{passError}</label>
        
    </div>
    
    );
}
 
export default Profile;
