import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export const GetUsers =() =>{
    
    const config = 
    {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
     
     return axios.get(`${process.env.REACT_APP_API_URL}/api/users`,config)
               
    }

export const GetPictureName =(username) =>
{
    
    const config = 
    {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
     
       return axios.get(`${process.env.REACT_APP_API_URL}/picture/${username}`,config)       
}



export const GetUserById =(id) =>{
    const[user,setUser] = useState({})
    const[verified,setVerified] = useState('');
    const[blocked,setBlocked] = useState('');
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
      useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`,config).then((res)=>{
                console.log(res.data)

                if(res.data.role === 'user' || res.data.role ==='admin')
                    {
                        setVerified('Verified')
                    }
                else
                    {
                        setVerified(res.data.verified)
                        setBlocked(res.data.blocked)
                    }
                             
                setUser(res.data);
                
        })
        .catch((error)=>{
            console.log(error);
        })
      }, []);

      return {user,verified,blocked};
}


export const DoRegister = (User) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`,User);   
}

export const UploadPicture = (form) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/picture`,form).then((res)=>{
        console.log(res.data)
        console.log('Photo Uploaded');
    })
    .catch((error)=> {
        console.log(error)
    });
}

export const DoLogin = (loginDto) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`,loginDto);
}

export const DoGoogleLogin = (googleLoginDto) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users/google-login`,googleLoginDto);
}

export const DoUserUpdate = (id,updateDto) => {
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
    return axios.put(`${process.env.REACT_APP_API_URL}/api/users/${id}`,updateDto,config)
}

export const UpdatePicture = (form) => {
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
   return axios.put(`${process.env.REACT_APP_API_URL}/update/picture`,form,config)
       
   
}

export const DoVerifyDriver = (email) => {
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
   return axios.put(`${process.env.REACT_APP_API_URL}/verify/${email}`,email,config)
       
   
}


export const DoVerifyDriverDecline = (email) => {
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
   return axios.put(`${process.env.REACT_APP_API_URL}/verify/decline/${email}`,email,config)
       
   
}


export const DoBlock = (email) => {
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
   return axios.put(`${process.env.REACT_APP_API_URL}/block/${email}`,email,config)
       
   
}


export const DoUnBlock = (email) => {
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
   return axios.put(`${process.env.REACT_APP_API_URL}/unblock/${email}`,email,config)
       
   
}


