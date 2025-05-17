import { useNavigate } from 'react-router-dom'
import logo from "../assets/banklogo.png"

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[90px] w-11/12 mx-auto flex justify-between items-center">
        <div className='flex items-center'>
          <img src={logo} alt="" className='bg-transparent w-20 h-20'/>
          <span className="font-bold text-2xl text-white hidden md:block">Ease Bank</span>
        </div>
        <div className="flex justify-end items-center space-x-6 text-sm">
          <a href="#" className="text-white hover:underline">FAQ</a>
          <a href="#" className="text-white hover:underline">Contact Us</a>
          <button 
            onClick={() => navigate('/login')} 
            className="px-4 py-2 border border-white rounded-full cursor-pointer">Log in</button>
          <button 
          onClick={() => navigate('/signup')}
          className="px-4 py-2 bg-white text-[#004876] rounded-full cursor-pointer">Create Account</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
