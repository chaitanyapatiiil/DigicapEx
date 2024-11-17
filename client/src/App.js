
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
  return (
   <Routes>
    <Route path="/" exact element={<Home />}/>
    <Route path="/login" exact element={<Login />}/>
  </Routes>
  );
}

export default App;
