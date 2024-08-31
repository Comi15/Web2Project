import { useState,useReducer } from "react";
const ProductList = ({users,handleVerify,handleVerifyDecline,handleBlock,handleUnBlock}) => {
    const[isVerified,setIsVerified] = useState()
    const drivers = users.filter(user => user.role === 'driver');
    drivers.sort((a,b)=> (a.id < b.id) ? 1 : -1)
    const a = 'Blocked';
    const b = 'Not Blocked'
    
    return (  
        <div className="products-list">
            <h2>Drivers</h2>
            <table className="styled-table">           
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Average Rating</th>
                    <th>Account status</th>
                    <th>Blocked</th>
                    <th>Verify Button</th>
                    <th>Decline Button</th>
                    <th>Block Button</th>
                </tr>
            </thead>
            <tbody>
                {drivers.map((driver) =>(
                    <>
                        
                        <tr key={driver.id}>                       
                           <td>{driver.name}</td>
                           <td>{driver.lastName}</td>
                           <td>{driver.username}</td>
                           <td>{driver.email}</td>
                           <td>{driver.averageRating}</td>
                           <td>{driver.verified}</td>
                           <td>{driver.blocked?a:b}</td>
                           <td>{driver.verified === 'Pending' && <button onClick={() => handleVerify(driver.email)} className="verify-button">Verify</button>}</td>
                           <td>{driver.verified === 'Pending' && <button onClick={() => handleVerifyDecline(driver.email)} className="decline-button">Reject</button>}</td>
                           <td>{driver.blocked? <button onClick={() => handleUnBlock(driver.email)} className="block-button">Unblock</button>:<button onClick={() => handleBlock(driver.email)} className="block-button" >Block</button>}</td>

                        </tr>
                    </>

                ))}
            </tbody>
        </table>

        </div>
    );
}
 
export default ProductList;