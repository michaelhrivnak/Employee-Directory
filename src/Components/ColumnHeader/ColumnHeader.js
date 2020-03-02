import React,{useState} from 'react'
import './ColumnHeader.css';
import {useGlobalContext} from '../../utils/GlobalState'; 


const ColumnHeader = (props) =>{

    const [_,dispatch] = useGlobalContext();
    const [state,setState] = useState("^");
    
    const handleClick= (e) =>{
        e.preventDefault();
        if(state === "^"){
            setState("v");
            dispatch({type:"sortUsers",property:props.name,direction:1});
        }else{
            setState("^");
            dispatch({type:"sortUsers",property:props.name,direction:-1});
        }
    }

    return(<td>
        <div>
        <button onClick={handleClick}>
            <label htmlFor={props.name}>{props.Name}</label>
        </button><i>{state}</i>
        </div>
        
        <input ref={props.filter} onChange={props.checkFilters} name={props.name} type="text"/>
    </td>)

}

export default ColumnHeader;