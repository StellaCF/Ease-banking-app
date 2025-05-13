// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage  from './user/LandingPage';
import Dashboard from './user/dashboard/Dashboard';
import SignUp from './auth/SignUp';
import LoginPage from './auth/LoginPage';
import ForgetPassword from './auth/ForgetPassword'
import VerifyPassword from './auth/VerifyPassword';
import ResetPassword from './auth/ResetPassword';
import TransactionPin from './auth/TransactionPin';



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path ="/dashboard" element={ <Dashboard /> } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/VerifyPassword" element={<VerifyPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/TransactionPin" element={<TransactionPin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
