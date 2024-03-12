import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ListPage from "./pages/ListPage/ListPage";
import HotelDetail from "./pages/HotelDetail/HotelDetail";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/list" element={<ListPage />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
