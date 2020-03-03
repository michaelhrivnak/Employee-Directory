import React,{ createContext, useContext, useReducer} from 'react';

const globalContext = createContext();
const { Provider } = globalContext;

const useGlobalContext = () => {
    return useContext(globalContext);
}

const filterUsers = (users,filters,sort,direction) => {    
    
    let filteredUsers = users.map(e => e);
    
    for(const filter of filters){
        filteredUsers = filteredUsers.filter((e) =>{
            //special case due to input data          
            if(filter.property === "company"){                
                return e.company.name.toLowerCase().includes(filter.value);
            }
            return e[filter.property].toLowerCase().includes(filter.value);
        });
    }
    
    return sortUsersByProperty(filteredUsers,sort,direction);    
}

const sortUsersByProperty = (users,property,direction)=>{
    let sortedUsers = users.map(e=>e);
    
    if (property === ""){return sortedUsers};

    if(property === "company"){
        sortedUsers.sort((a,b)=>{
            if(a.company.name < b.company.name){
                return -1*direction;
            }else if (a.company.name > b.company.name){
                return 1*direction;
            }else{
                return 0;
            }
        });
    }else{
        sortedUsers.sort((a,b)=>{
            if(a[property] < b[property]){
                return -1*direction;
            }else if (a[property] > b[property]){
                return 1*direction;
            }else{
                return 0;
            }
        });
    }
        
    return sortedUsers;
}

const reducer = (state, action) => {
    switch (action.type) {
        case "loadData":
            let users = action.data;
            return {...state,users:users, filteredUsers: users.map(e=>e)};
        case "filterUsers":
            return {...state, filteredUsers: filterUsers(state.users,action.filters,state.sort,state.sortDirection)};
        case "clearFilters":
            return {...state, filteredUsers: sortUsersByProperty(state.users.map(e=>e),state.sort)};
        case "sortUsers":
            return {...state, filteredUsers: sortUsersByProperty(state.filteredUsers,action.property,action.direction)
                                            ,sort:action.property,sortDirection:action.direction};
        default:
        throw new Error(`Invalid action type: ${action.type}`);
    }
  };

const ContextProvider = ({ users = [], filteredUsers = [], ...props }) => {
    
    const [state,dispatch] = useReducer(reducer, { users: users, filteredUsers: filteredUsers,sort:"",sortDirection:1});
    return ( <Provider value={[state, dispatch]} {...props} />);
}

export { ContextProvider, useGlobalContext };
