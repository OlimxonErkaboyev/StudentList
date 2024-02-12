import { Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<h1>About</h1>} />
        <Route path='/services' element={<h1>Services</h1>} />
        <Route path='/team' element={<h1>Team</h1>} />
        <Route path='/contact' element={<h1>Contact</h1>} />
        <Route path='/*' element={<h1>error 404 Page Not Found </h1>} />
      </Routes>
    </>
  );
}

export default App;
