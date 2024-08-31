import useAuth from "./hooks/useAuth";

const Dashboard = () => {
    const { auth } = useAuth();
    console.log(auth)
    return ( 
        <div className="dashboard-div">
            <h2>Welcome to the dashboard</h2>
        </div>
     );
}
 
export default Dashboard;