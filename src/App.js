
import './App.css';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signin from './pages/Sign in/Signin';
import Video from './pages/video/Video';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './pages/search/Search';

function App() {
  return (
   <>
   <div className='container' style={{backgroundColor:"black"}}>
   <BrowserRouter>
    <Menu/>
    <div className='main'>
      <Navbar/>
      <div className='Wrapper'>
      <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trend"/>} />
                  <Route path="subscriptions" element={<Home type="sub"/>} />
                  <Route path="search" element={<Search/>} />
                  <Route path="signin" element={<Signin />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
      </div>
    </div>
    </BrowserRouter>
   </div>
   
   </>
  );
}

export default App;
