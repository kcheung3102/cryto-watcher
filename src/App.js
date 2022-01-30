import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import {BrowserRouter, Route,  Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { CoinPage } from './Pages/CoinPage';

function App() {

  return (
    <BrowserRouter>
    <div className="app">
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/coins/:id' element={<CoinPage />}/>
        {/* <Route path='/' element={<Home />}/> */}
        </Routes>
    </div>
      </BrowserRouter>
  );
}

export default App;
