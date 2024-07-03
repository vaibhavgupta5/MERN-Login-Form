
export default function Error({isHidden , message, isSuccess}) {

  return (
    <div className={`w-[60%]  rounded-md p-2 mb-4 border-[2px] border-solid ${isSuccess ? "border-green-500 text-green-500" : "border-red-600 text-red-600" } bg-white m-2  text-lg ${isHidden && "hidden"} text-center transition-all ease-in-out`}>
        <p>{message}</p>
    </div>
  )
}
