import { DoGoogleLogin, DoLogin } from "./UserService";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import LoginDto from "./Models/LoginDto";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const[isPending,setIsPending] = useState(false);
    const[error,setError] = useState('');
    const[loginError,setLoginError] = useState('')
    const { setAuth } = useAuth();

   



    useEffect(() => {
        setError('');
    }, [email,password]);
    const navigate = useNavigate();
   
    const handleSubmit = (e) =>
        {
            e.preventDefault();
            const loginDto = new LoginDto(email,password)

            DoLogin(loginDto)
                .then(function (response) {
                    handleReponse(response);
                    console.log(response);
                })
                .catch(function (error) {
                    setError(error.response.data);
                    console.log(error);
                });
        }

        const handleGoogleLogin = (response) => {
            var userObject = jwtDecode(response.credential);
            const googleDto = {
                email: userObject.email,
                name: userObject.given_name,
                lastName: userObject.family_name,
                img: userObject.picture
            };
            
            DoGoogleLogin(googleDto)
                .then(function (response) {
                    handleReponse(response);
                    navigate('/dashboard');
                })
                .catch(function (error) {
                    setError(error.response.data);
                });
        };

        const handleGoogleLoginError = (error) => {
            setError(error);
        };

        const handleReponse = (response) => {
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userId',response.data.id);
            localStorage.setItem('userEmail',response.data.email);
            localStorage.setItem('role',response.data.role);
            localStorage.setItem('username',response.data.username)
            const id = response.data.id;
            const role = response.data.role;
            const accessToken = response.data.token;
            const userEmail = response.data.email;
            setAuth({id,role,accessToken,userEmail});
            navigate('/dashboard');
        }

    return ( 
        <div className="create">
            <label className="login-error">{error}</label>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Email :</label>
                    <input 
                        type="email" 
                        required
                        value = {email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                        required
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)} 
                    ></input>
                </div>
                <button>Sign in</button>
                <div>
                    <GoogleLogin onSuccess={handleGoogleLogin} onError={handleGoogleLoginError} />
                </div>
            </form>

        </div>

     );
}
 
export default Login;