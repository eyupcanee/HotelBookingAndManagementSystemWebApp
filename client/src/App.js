import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ListPage from "./pages/ListPage/ListPage";
import HotelDetail from "./pages/HotelDetail/HotelDetail";
import ProtedtedRoute from "./context/ProtectedRoute";
import MakeReservation from "./pages/MakeReservation/MakeReservation";
import LoginUser from "./pages/LoginUser/LoginUser";
import { AuthProvider } from "./context/AuthProvider";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/list" element={<ListPage />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/reservation/add/:id" element={
            
              <MakeReservation/>
           
          }/>
          <Route path="/user/login" element={
            <ProtedtedRoute authType="user" accessBy="non-authenticated">
              <LoginUser/>
            </ProtedtedRoute>
          
          }/>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
