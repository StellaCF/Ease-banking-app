// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage  from './user/LandingPage';
import Dashboard from './user/dashboard/Dashboard';
import SignUp from './auth/SignUp';
import LoginPage from './auth/LoginPage';
import ForgetPassword from './auth/ForgetPassword'
import VerifyPassword from './auth/VerifyPassword';
import ResetPassword from './auth/ResetPassword';
import TransactionPin from './auth/TransactionPin';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import DepositPage from './user/dashboard/DepositPage';
import WithdrawPage from './user/dashboard/WithdrawPage';
import TransferPage from './user/dashboard/TransferPage';
import SavePage from './user/dashboard/SavePage';
import LoanPage from './user/dashboard/LoanPage';
import Profile from './user/dashboard/Profile';
import Transaction from './user/dashboard/Transaction';
import TransactionDetails from './user/dashboard/TransactionDetails';
import Settings from './user/dashboard/Setting';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/dashboard" element={ <Dashboard /> } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/verifyPassword" element={<VerifyPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/transactionPin" element={<TransactionPin />} />
        <Route path="/depositPage" element={<DepositPage />} />
        <Route path="/withdrawPage" element={<WithdrawPage />} />
        <Route path="/transferPage" element={<TransferPage />} />
        <Route path="/savePage" element={<SavePage />} />
        <Route path="/loanPage" element={<LoanPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/transactiondetails" element={<TransactionDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;
