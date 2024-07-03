import { useState } from "react";
import "./App.css";
import Login from "./componets/Login";
import Register from "./componets/Register";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import Error from "./componets/Error";

function App() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div
      className={`bg-[url('./assets/bg.jpg')] md:w-full bg-cover bg-center flex relative ${
        isRegister ? "h-[100vh]" : "h-[101vh]"
      } transition-all ease-in-out `}
    >
      <div className="w-[50%] h-full flex flex-col justify-end p-16 max-[768px]:hidden relative ">
        <p className="text-white font-bold text-[90px] leading-[5.5rem] pb-4 ">
          PAST
          <br /> OF SOME
          <br /> COOL FUTURE!
        </p>
      </div>
      <div className="w-[50%] h-full relative max-[768px]:w-[100%] ">
        <div className="absolute inset-0 bg-white/0 backdrop-brightness-100 blur-lg z-0"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-8 text-white max-[768px]:w-[100%]  ">
          <p className="text-4xl p-4 font-semibold max-[768px]:text-2xl">
            Sign In to Explore
          </p>
          <button className="text-white w-[60%] max-[768px]:w-[100%] mt-4 border-[1px] p-3 border-solid border-gray-400 rounded-md hover:bg-white hover:text-[#3C4BBD] transition-all ease-in-out flex items-center">
            <FcGoogle className="text-xl w-[10%] " />
            <div className="w-[90%] mr-8">Sign in with Google</div>
          </button>

          <button className="text-white w-[60%] max-[768px]:w-[100%] mt-4 border-[1px] p-3 border-solid rounded-md border-gray-400  hover:bg-white hover:text-[#3C4BBD] transition-all ease-in-out flex items-center">
            <FaFacebook className="text-xl w-[10%] " />
            <div className="w-[90%] mr-8">Sign in with Facebook</div>
          </button>
          <button className="text-white w-[60%] max-[768px]:w-[100%]  mt-4 border-[1px] p-3 border-solid border-gray-400 rounded-md  hover:bg-white hover:text-[#3C4BBD] transition-all ease-in-out flex items-center">
            <FaGithub className="text-xl w-[10%] " />
            <div className="w-[90%] mr-8">Sign in with GitHub</div>
          </button>

          <hr className="mt-7 w-[60%] m-6 border-solid border-gray-400 opacity-20"></hr>

          {isRegister ? (
            <Login setIsRegister={setIsRegister} />
          ) : (
            <Register setIsRegister={setIsRegister} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
