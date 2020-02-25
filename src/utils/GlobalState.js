import React,{ createContext, useContext, useReducer} from 'react';

const globalContext = createContext();
const { Provider } = globalContext;

const useGlobalContext = () => {
    return useContext(globalContext);
}

const filterUsers = (users,filters) => {    
    
    let filteredUsers = users.map(e => e);

    for(const filter of filters){
        filteredUsers = filteredUsers.filter((e) =>{
            return e[filter.property].contains(filter.value);
        });
    }

    return filteredUsers;    
}

const reducer = (state, action) => {
    switch (action.type) {
    case "loadData":
        let users = action.data;
        return {...state,users:users, filteredUsers: users.map(e=>e)};
    case "filterUsers":
        return {...state, filteredUsers: filterUsers(state.users,action.filters)};
    case "clearFilters":
        return {...state, filteredUsers: state.users.map(e=>e)};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
    }
  };

const ContextProvider = ({ users = [], filteredUsers = [], ...props }) => {
    
    const [state,dispatch] = useReducer(reducer, { users: users, filteredUsers: filteredUsers});
    return ( <Provider value={[state, dispatch]} {...props} />);
}

export { ContextProvider, useGlobalContext };
