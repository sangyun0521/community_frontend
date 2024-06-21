import './App.css';
import {Route, Routes} from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import HomePage from "./pages/HomePage.js";
import Signin from './pages/Signin';
import BoardDetailPage from './pages/BoardDetailPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/mypage" element={<MyPage/>}/>
      <Route path="/board" element={<BoardPage/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path='/article/:articleId' element={<BoardDetailPage/>}/>
    </Routes>
  );
}

export default App;
