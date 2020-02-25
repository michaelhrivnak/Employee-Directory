import React, {useEffect} from 'react';
import './UserList.css';
import User from '../User/User';
import {useGlobalContext} from '../../utils/GlobalState';




const UserList = function(){
    
    const [state,dispatch] = useGlobalContext();

    useEffect(()=> {
        
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>{
                return response.json();
            }).then(data =>{
                dispatch({type:"loadData", data:data});
            });
            
    },[dispatch]);
    
    return (<table>
                <thead>
                    <tr>
                        <td>
                            <label>Name</label>
                            <input type="text"/>
                        </td>
                        <td>
                            <label>Email</label>
                            <input type="text"/>
                        </td>
                        <td>
                            <label>Phone</label>
                            <input type="text"/>
                        </td>
                        <td>
                            <label>Company</label>
                            <input type="text"/>
                        </td>
                    </tr>
                </thead>
                <tbody>
                {state.filteredUsers.map(e =>{
                    return <User key={e.id} name={e.name} email={e.email} phone={e.phone} company={e.company.name}/>
                })}
                </tbody>
                
            </table>)
}
export default UserList;