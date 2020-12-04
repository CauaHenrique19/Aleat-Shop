import React from 'react'
import UserProvider from './context/context';
import Routes from './routes'
import './styles/global.css'

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
