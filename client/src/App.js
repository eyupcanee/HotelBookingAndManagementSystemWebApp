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
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminUserListPage from "./pages/AdminUserListPage/AdminUserListPage";
import AdminHotelsListPage from "./pages/AdminHotelsListPage/AdminHotelsListPage";
import AdminHotelManagersListPage from "./pages/AdminHotelManagersListPage/AdminHotelManagersListPage";
import AdminReservationListPage from "./pages/AdminReservationListPage/AdminReservationListPage";
import AdminAddUser from "./pages/AdminAddUser/AdminAddUser";
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
            <Route
              path="/dashboardtest"
              element={<AdminUserListPage />}
            ></Route>
            <Route
              path="/hotelmanager/dashboard"
              element={
                <ProtectedRoute
                  authType="hotelManager"
                  accessBy="authenticated"
                >
                  <AdminDashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute authType="admin" accessBy="authenticated">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute authType="admin" accessBy="authenticated">
                  <AdminUserListPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/hotels"
              element={
                <ProtectedRoute authType="admin" accessBy="authenticated">
                  <AdminHotelsListPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/hotelmanagers"
              element={
                <ProtectedRoute authType="admin" accessBy="authenticated">
                  <AdminHotelManagersListPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/reservations"
              element={
                <ProtectedRoute authType="admin" accessBy="authenticated">
                  <AdminReservationListPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/adduser"
              element={
                <ProtectedRoute authType="admin" accessBy="authenticated">
                  <AdminAddUser />
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
