import React from 'react';
import { ContextProvider } from './utils/GlobalState'
import UsersList from './Components/UserList/UserList';
import './App.css';

function App() {
  return (
  <ContextProvider>
    <UsersList />  
  </ContextProvider>
  );
}

export default App;
