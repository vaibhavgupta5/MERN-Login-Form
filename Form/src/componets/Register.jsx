import axios from "axios";
import Error from "./Error";
import { useState } from "react";

export default function Register({ setIsRegister }) {
  const [isHidden, setIsHidden] = useState(true);
  const [message, setmessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleformSubmit = (e) => {
    e.preventDefault();

    let fullname = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;

    if (email === "" || password === "" || email === "") {
      setIsHidden(false);
      setmessage("All Fields are Required!");
      setIsSuccess(false);

      setTimeout(() => {
        setIsHidden(true);
      }, 3000);
    }

    axios
      .post("http://localhost:8000/api/v1/users/register", {
        fullname,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        setIsRegister(true);
      })
      .catch((err) => {
        setIsHidden(false);
        setmessage(err.message);
        setIsSuccess(false);

        setTimeout(() => {
          setIsHidden(true);
        }, 3000);
      });
  };

  return (
    <>
      <Error isHidden={isHidden} message={message} isSuccess={isSuccess} />

      <form
        className="flex flex-col w-[60%] max-[768px]:w-[100%]"
        onSubmit={(e) => handleformSubmit(e)}
      >
        <label htmlFor="email" className="">
          Full Name
        </label>
        <input
          className='"text-white w-full bg-transparent mt-2 border-[1px] p-3 border-solid border-gray-400 rounded-md'
          type="text"
          name="fullname"
          id="fullname"
        />

        <label htmlFor="email" className="mt-2">
          Email Address
        </label>
        <input
          className='"text-white w-full bg-transparent mt-2 border-[1px] p-3 border-solid border-gray-400 rounded-md'
          type="text"
          name="email"
          id="email"
        />

        <label className=" mt-2">Password</label>
        <input
          className='"text-white w-full bg-transparent mt-2 border-[1px] p-3 border-solid border-gray-400 rounded-md'
          type="password"
        />

        <button
          type="submit"
          className="text-white w-full  mt-4 text-lg font-semibold p-3 rounded-md bg-[#3C4BBD] hover:bg-white hover:text-[#3C4BBD] transition-all ease-in-out"
        >
          Register
        </button>
      </form>

      <button
        className="p-4"
        onClick={() => {
          setIsRegister(true);
        }}
      >
        Already Have Account? Login
      </button>
    </>
  );
}
