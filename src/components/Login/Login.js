import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.scss"
import { BsGlobe2 } from "react-icons/bs"
import { RiLinkedinLine } from "react-icons/ri"
import { FaGithubAlt } from "react-icons/fa"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { BiMailSend } from "react-icons/bi"
import jwtDecode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TiTick } from "react-icons/ti"
import { RxCrossCircled } from "react-icons/rx"
import { validate } from 'react-email-validator'

const Login = () => {

  const navigate = useNavigate();
  const [isvisible, setisvisible] = React.useState(false)
  const [isemail, setisemail] = React.useState(false)
  const [credentials, setCredentials] = React.useState({ email: "", pass: "", key: "AyushIsAGoodBoy" })
  const hiddenornot = (event) => {
    event.preventDefault();
    setisvisible(prev => { return !prev })
  }
  function handleChange(event) {
    setCredentials(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }
  const gettingtoken = async (e) => {
    e.preventDefault();
    // console.log("Button is pressed")
    const res = await fetch(
      'https://authking.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
      referrerPolicy: "origin-when-cross-origin"
    }
    )
    if (res.status === 200) {
      const newUser_response = await res.json()
      console.log("JWT is: ", newUser_response)
      window.localStorage.setItem('authKey', newUser_response.token);
      navigate("/");
    }
    else {
      const newUser_response = await res.json()
      console.log(newUser_response);
      toast.error(newUser_response.message);
    }
  }
  return (
    <div className='loginMain font-[poppins] bg-[#FBF5EE] h-[100vh] relative flex flex-col items-center justify-center'>
      <ToastContainer position="top-center" />
      <div className="loginnav flex w-[90vw] pt-6 mx-auto justify-between items-start">
        <div className="logoandmail flex flex-col">
          <div className="logo">
            <h1 className='font-bold text-3xl'><span className='text-[purple]'>Time</span><span className='text-[orange]'>Less</span></h1>
          </div>
          <div className="mail font-medium">
            <div className='line block bg-black opacity-40 w-44 h-[1px] mb-3' />
            <a href="mailto:developer.authking@gmail.com">developer.authking@gmail.com</a>
          </div>
        </div>
        <div className="signupandrequest flex items-center gap-7">
          <div className="signup flex items-center gap-2">
            <BsGlobe2 className='aspect-square' />
            <h4 className='font-semibold'>Sign Up</h4>
          </div>
          <div className="request bg-pink-400 py-2 px-4 rounded-md text-white font-medium">
            <h4>Request a demo</h4>
          </div>
        </div>
      </div>
      <div className="loginsection mt-10">
        <div className="loginrect h-[65vh] w-[23vw] bg-[rgba(255,255,255,0.6)] shadow-lg rounded-3xl border border-[rgba(0,0,0,0.1)] mb-4  p-8 flex flex-col items-center gap-5">
          <div className="flex flex-col items-center justify-center w-[100%] gap-2">
            <div className="head"><h3 className='font-bold text-xl'>Account Login</h3></div>
            <div className="loginLine font-regular text-xs text-center"><p>Hey, Enter your details to get sign in to your account</p></div>
          </div>
          <form action='' className="loginup w-[95%] flex flex-col gap-4">
            <div className="loginfields flex flex-col gap-5 pt-3 w-[100%]">
              <div className="email rounded-lg shadow-md outline outline-[0.1px] outline-[rgba(0,0,0,0.2)] flex items-center justify-around ">
                <input type="email" name="email" onChange={(event) => {
                  setCredentials(prevFormData => {
                    return {
                      ...prevFormData,
                      [event.target.name]: event.target.value
                    }
                  })
                  if (validate(event.target.value)) {
                    setisemail(true)
                  }
                  else {
                    setisemail(false)
                  }
                }} className=' p-3 px-5 placeholder:text-xs text-xs focus:outline-none focus:border-none w-[80%] h-[100%] bg-transparent' placeholder='Enter Email/User Name' />
                {
                  isemail ? <TiTick color='green' /> : <RxCrossCircled color='red' />
                }
              </div>
              <div className="pass text-xs rounded-lg shadow-md outline outline-[0.1px] outline-[rgba(0,0,0,0.2)] flex items-center justify-around">
                <input type={isvisible ? "password" : "text"} name="pass" onChange={handleChange} pattern='' className=' p-3 px-5 focus:outline-none focus:border-none placeholder:text-xs w-[80%] h-[100%] bg-transparent' placeholder='Password' />
                <div onClick={hiddenornot}>
                  {
                    isvisible ? <AiFillEyeInvisible /> : <AiFillEye />
                  }
                </div>
              </div>
            </div>
            <h5 className=' font-semibold text-xs'>Having trouble in sign in ?</h5>
            <button type='submit' className='w-100% p-3 px-5 rounded-lg shadow-md bg-pink-400 font-medium text-white text-sm' onClick={gettingtoken}>Sign In</button>
          </form>
          <div className="otherLogins flex flex-col justify-center items-center gap-3">
            <h4 className='font-semibold text-sm'>--- Or Sign In With ---</h4>
            <div className="buttons flex gap-3">
              <div id="googleDiv">
                {/* <button className='googleButton py-1 px-3 border border-black flex items-center gap-5 rounded-xl'><BsGoogle />Google</button> */}
                <GoogleLogin
                  theme='filled_black'
                  shape='circle'
                  size='medium'
                  onSuccess={credentialResponse => {
                    const res_data = jwtDecode(credentialResponse.credential)
                    console.log(res_data);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                />
              </div>
              <div id="googleDiv">
                {/* <button className='googleButton py-1 px-3 border border-black flex items-center gap-5 rounded-xl' onClick={()=>logingoogle()}><BsGoogle/>Google</button> */}
              </div>
            </div>
          </div>
          <div className="signupdiv text-xs w-[100%] text-center"><p>Don't Have An Account? <a href="/" className='font-semibold'>Request Now</a></p></div>
        </div>
        <div className="copyright">
          <p className='text-xs text-center'>Copyright @TimeLess 2023 | Privacy Policy</p>
        </div>
      </div>
      <div className="loginfooter w-[90vw] bottom-12">
        <div className="connect font-semibold flex gap-3 flex-col">
          <h4>Connect with me:</h4>
          <div className="icons flex gap-3 w-[10%] justify-between">
            <FaGithubAlt className='w-[15%] h-[20%] aspect-square' />
            <RiLinkedinLine className='w-[15%] h-[20%] aspect-square' />
            <BiMailSend className='w-[15%] h-[20%] aspect-square' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login