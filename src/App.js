import './App.css';
import Navigation from './components/routes/navigation/navigation.component'
import Dashboard from './components/routes/dashboard/dashboard.component'
import Data from './components/routes/data/data.component'

import {Routes , Route} from 'react-router-dom' // importing the react router 

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Navigation />} >
        <Route path = '/dashboard' element = {<Dashboard />} />
        <Route path = '/enter-data' element = {<Data />} /> 
      </Route>
    </Routes>
  );
}

export default App;
