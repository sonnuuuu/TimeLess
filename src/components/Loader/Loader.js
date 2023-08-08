import React from 'react'
import { Cursor, useTypewriter } from "react-simple-typewriter";
const Loader = () => {

    const [text] = useTypewriter({
		words: ["TimeLess", "Your Time Management Buddy"],
		loop: true,
		delaySpeed: 2000,
	});
  return (
    <div className='loader-main h-[100vh] w-[100vw] flex justify-center items-center bg-[#FBF5EE]'>
        <p className="text-3xl font-semibold px-10">
					<span>{text}</span>
					<Cursor cursorColor="#F7AB0A" />
        </p>
    </div>
  )
}

export default Loader