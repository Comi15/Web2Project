import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  var token = localStorage.getItem('token');
  var role = localStorage.getItem('role')
  var count = localStorage.getItem('count')
  

  if(token == null){
    return <Navigate to="/login" />
  }

  if(props.role != undefined && props.role.includes(role) === false){
    return <Navigate to="/unauthorized" />
  }

  if(props.count === 'true')
  {
    return <Navigate to="/while-counter" /> 
  }

  return <props.Component additionalProp={props.additionalProp} />
}

export default ProtectedRoute;