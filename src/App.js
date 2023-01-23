import Content from './components/Content';
import Navbar from './components/Navbar';
import Post from './components/Post';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login';
import CreateAcc from './components/CreateAcc';
import Account from './components/Account';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<div ><Navbar /><Content /></div>} />
        <Route path='/postcritic' element={<div ><Navbar /><Post /></div>} />
        <Route path='/login' element={<div ><Login /></div>} />
        <Route path='/createAcc' element={<div ><CreateAcc /></div>} />
        <Route path='/account' element={<div ><Account /></div>} />
      </Routes>
    </Router>

  );
}

export default App;
