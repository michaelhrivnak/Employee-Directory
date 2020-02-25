import React from 'react';
import './User.css';


const User = function(props){
    return (<tr className="row">
                <td className="col">{props.name}</td>
                <td className="col">{props.email}</td>
                <td className="col">{props.phone}</td>
                <td className="col">{props.company}</td>
            </tr>)
}

export default User;