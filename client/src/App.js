import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ListPage from "./pages/ListPage/ListPage";
import HotelDetail from "./pages/HotelDetail/HotelDetail";
import ProtectedRoute from "./context/ProtectedRoute";
import MakeReservation from "./pages/MakeReservation/MakeReservation";
import LoginUser from "./pages/LoginUser/LoginUser";
import LoginRoute from "./pages/LoginRoute/LoginRoute";
import { AuthProvider } from "./context/AuthProvider";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";
import LoginHotelManager from "./pages/LoginHotelManager/LoginHotelManager";
import Register from "./pages/Register/Register";
import UserReservations from "./pages/UserReservations/UserReservations";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/list" element={<ListPage />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route
              path="/reservation/add/:id"
              element={
                <ProtectedRoute authType="user" accessBy="authenticated">
                  <MakeReservation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute accessBy={"non-authenticated"} authType={"all"}>
                  <LoginRoute />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <ProtectedRoute accessBy={"non-authenticated"} authType={"all"}>
                  <Register />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/user/login"
              element={
                <ProtectedRoute authType="user" accessBy="non-authenticated">
                  <LoginUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/login"
              element={
                <ProtectedRoute authType="admin" accessBy="non-authenticated">
                  <LoginAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hotelmanager/login"
              element={
                <ProtectedRoute
                  authType="hotelManager"
                  accessBy="non-authenticated"
                >
                  <LoginHotelManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/reservations"
              element={
                <ProtectedRoute authType="user" accessBy="authenticated">
                  <UserReservations />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
