import './App.css';
import { useState , useEffect } from 'react';
import { collection , onSnapshot } from 'firebase/firestore';
import { useContext } from 'react';
import { UserContext } from './contexts/user.context';
import {Routes , Route} from 'react-router-dom' // importing the react router 

import db from './components/utils/firebase.utils';

import Navigation from './components/routes/navigation/navigation.component'
import Dashboard from './components/routes/dashboard/dashboard.component'
import Authentication from './components/routes/authentication/authentication.component'
import Data from './components/routes/data/data.component'

function App() {
  const {currentUser , setCurrentUser }= useContext(UserContext);
  const [unlocked , setUnlocked] = useState(false)

  useEffect(() => {

      const usersCollection = collection(db , "users")
      onSnapshot(usersCollection , (snapshot) => {
        const filteredArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        filteredArray.map(item => {
          if(currentUser != null && item.id == currentUser.uid && item.unlocked){
            setUnlocked(true);
          }
          else{
            setUnlocked(false);
          }
        })

      })
  } , [currentUser])

  return (
    <Routes>
      <Route path = '/' element = {<Navigation />} >
        <Route index element = {<Dashboard unlocked={unlocked}/>} />  
        <Route path='/enter-data' element={<Data unlocked={unlocked} />} /> 
        <Route path = 'auth' element = {<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
