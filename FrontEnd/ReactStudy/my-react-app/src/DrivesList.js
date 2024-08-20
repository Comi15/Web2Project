const DrivesList = ({newDrives,role,handleAccept}) => {
    newDrives.sort((a,b)=> (a.id < b.id) ? 1 : -1)
    return ( 
        <div className="products-list">
            <table className="styled-table">           
            <thead>
                <tr>
                    <th>Starting Destination</th>
                    <th>End Destination</th>
                    <th>Price</th>
                    <th>Status</th>
                    {role === 'driver' && <th>Accept Button</th>}
                    
                    
                </tr>
            </thead>
            <tbody>
                {newDrives.map((drive) =>(
                    <>                       
                        <tr key={drive.id}>                       
                           <td>{drive.startDestination}</td>
                           <td>{drive.endDestination}</td>
                           <td>{drive.estimatedPrice + ' dinars'}</td>
                           <td>{drive.status}</td>
                           {role=== 'driver' && <td><button onClick={() => handleAccept(drive.id)} className="verify-button">Accept</button></td>}

                        </tr>
                    </>

                ))}
            </tbody>
        </table>

        </div>
     );
}
 
export default DrivesList;