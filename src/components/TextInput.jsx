import React,{useState} from 'react'

const TextInput = ({type,placeholder,icon,toggleable = false}) => {
    const [showPassowrd,setShowPasswprd] = useState(false);
    const iconClass = " absolute right-3 text-black top-1/2 transform translate-y-[-50%] text-blue-500 text-lg"
    const togglePassword =()=>{
        setShowPasswprd(!showPassowrd);
    }
  return (
    <div className='relative w-[90%]'>
      <input type={toggleable?(showPassowrd?"text":'password'):type} 
      placeholder={placeholder} 
      className='w-full py-2.5 pr-10 pl-1.5 border-0 border-b-2 border-b-amber-100 text-sm placeholder:text-primary focus:outline-0'
      required />
      {toggleable ? (
        <i
          className={icon + " " + iconClass}
          onClick={togglePassword}
          style={{ cursor: "pointer" }}
        ></i>
      ) : (
        <i className={icon + " " + iconClass}></i>
      )}
    </div>
  )
}

export default TextInput
