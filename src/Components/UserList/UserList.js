import React, {useEffect,useRef} from 'react';
import './UserList.css';
import User from '../User/User';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import {useGlobalContext} from '../../utils/GlobalState';




const UserList = function(){
    
    const [state,dispatch] = useGlobalContext();

    let emailFilter = useRef();
    let nameFilter = useRef();
    let phoneFilter = useRef();
    let companyFilter = useRef();

    useEffect(()=> {
        
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>{
                return response.json();
            }).then(data =>{
                dispatch({type:"loadData", data:data});
            });
            
    },[dispatch]);
    
    const checkFilters = () => {

        let filters = [{property:"name",value:nameFilter.current.value.toLowerCase()},
        {property:"email",value:emailFilter.current.value.toLowerCase()},
        {property:"phone",value:phoneFilter.current.value.toLowerCase()},
        {property:"company",value:companyFilter.current.value.toLowerCase()}];

        filters = filters.filter(e=>{
            return e.filter !== "";
        });

        dispatch({type:"filterUsers",filters:filters});

    }

    const clearFilter = () =>{

        nameFilter.current.value = "";
        emailFilter.current.value = "";
        phoneFilter.current.value = "";
        companyFilter.current.value = "";
        dispatch({type:"clearFilters"});
    }

    return (<table>
                <thead>
                    <tr>
                        <ColumnHeader name="name" Name="Name" filter={nameFilter} checkFilters={checkFilters}></ColumnHeader>
                        <ColumnHeader name="email" Name="Email" filter={emailFilter} checkFilters={checkFilters}></ColumnHeader>
                        <ColumnHeader name="phone" Name="Phone" filter={phoneFilter} checkFilters={checkFilters}></ColumnHeader>
                        <ColumnHeader name="company" Name="Company" filter={companyFilter} checkFilters={checkFilters}></ColumnHeader>
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