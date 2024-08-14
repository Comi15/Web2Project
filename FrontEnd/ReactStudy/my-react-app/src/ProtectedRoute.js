import { Navigate } from 'react-router-dom';


const ProtectedRoute = (props) => {

  var token = localStorage.getItem('token');
  var role = localStorage.getItem('role')
  

  if(token == null){
    return <Navigate to="/login" />
  }

  if(props.role != undefined && role != props.role){
    return <Navigate to="/unauthorized" />
  }

 

  return <props.Component additionalProp={props.additionalProp} />
}

export default ProtectedRoute;