
import './App.css';
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Home from './components/Home/Home';
import Writestory from './components/Home/Writestory';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element= {<Login />}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/writestory" element={<Writestory />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
