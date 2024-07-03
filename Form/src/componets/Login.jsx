import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import { useState } from "react";


export default function Login({ setIsRegister }) {

  const [isHidden, setIsHidden] = useState(true)
  const [message, setmessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate();


  const handleformSubmitLogin = (e) =>{
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;


    if((email === "" || password === "")){
      setIsHidden(false)
      setmessage("All Fields are Required!")
      setIsSuccess(false)
      
      setTimeout(() => {
        setIsHidden(true)
      }, 3000);
    }

    axios.post("http://localhost:8000/api/v1/users/login", {
      email,
      password
    }).then(result => {console.log(result); navigate('/home') })
    .catch(err => {

      console.log(err)
      console.log(err.name, err.message, err.status)

      setIsHidden(false)
      setmessage(err.message)
      setIsSuccess(false)

      setTimeout(() => {
        setIsHidden(true)
      }, 3000);
    })
  }


  return (
    <>
      <Error isHidden={isHidden} message={message} isSuccess={isSuccess}/>

      <form className="flex flex-col w-[60%] max-[768px]:w-[100%]" onSubmit={(e)=> handleformSubmitLogin(e)}>
        <label htmlFor="email" className="" >
          Email Address
        </label>
        <input
          className='"text-white w-full bg-transparent mt-2 border-[1px] p-3 border-solid border-gray-400 rounded-md '
          type="text"
          name="email"
          id="email"
        />

        <label className="pt-2 mt-2">Password</label>
        <input
          className='"text-white w-full bg-transparent mt-2 border-[1px] p-3 border-solid border-gray-400 rounded-md '
          type="password"
        />
        <button
          type="submit"
          className="text-white w-full  mt-4 text-lg font-semibold p-3 rounded-md bg-[#3C4BBD] transition-all ease-in-out  hover:bg-white hover:text-[#3C4BBD]"
        >
          Login
        </button>
      </form>

      <button
        className="p-4"
        onClick={() => {
          setIsRegister(false);
        }}
      >
        Don't Have Account? Register
      </button>


    </>
  );
}
