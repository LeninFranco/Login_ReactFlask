import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <Router>
    <NavBar/>
      <div className="container">
        <br /><br />
        <Routes>
          <Route path='/' Component={LoginPage}/>
          <Route path='/home' Component={HomePage} />
          <Route path='/signup' Component={SignUpPage}/>
          <Route path='/*' Component={NotFoundPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
