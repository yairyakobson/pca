import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useGetCurrentUserQuery } from "./redux/services/userApi";

function App(){
  const { isAuthenticated } = useSelector((state) => state.user);

  // Fetch current user when the app loads
  const { refetch } = useGetCurrentUserQuery(null, {
    skip: isAuthenticated // Skip if already authenticated
  });

  useEffect(() => {
    if (!isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  return(
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1 }}>
          <Header/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile/my_profile" element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>}/>
            </Routes>
            <Toaster richColors position="top-right"/>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;