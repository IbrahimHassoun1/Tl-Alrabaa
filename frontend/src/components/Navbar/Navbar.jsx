import React, { useContext, useState } from 'react'
React
import logo from '../../assets/black-bg-logo.jpg'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { MyContext } from '../../context/Context'


const Navbar = () => {
    const [isActive,setIsActive]=useState("")
    const [burgerOpen,setBurgerOpen]=useState(false)
    const [userOptionsIsVisible,setUserOptionsIsVisible]=useState(false)
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        const offset = 80;  // Optional: adjust this value to match your navbar height
        const yPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
      };
   

const {loggedIn,setLoggedIn,setToken}=useContext(MyContext)
localStorage.getItem("token")?()=>{setToken(localStorage.getItem("token"));setLoggedIn(true)}:setLoggedIn(false)
const {setShowPopup}=useContext(MyContext)
  return (
    <div className='bg-primary Navbar sticky top-0 w-full z-10 h-20 font-primary font-medium text-2xl flex ' >

        <div className='m-auto flex containers justify-between w-full h-16 text-tertiary'>
            <Link to="/" className={`left-nav ${isActive==="home"?"active":""} mr-auto sm:mr-0  cursor-pointer`} onClick={()=>{setIsActive("home");scrollToSection("home");setShowPopup(false)}} >
                <img src={logo} alt="logo" className='w-full h-full object-contain cursor-pointer'/>
            </Link>

            <div className='center-nav hidden sm:flex items-center pl-24'>
                <ul className='flex gap-3' onClick={()=>setShowPopup(false)}>
                    
                    <Link to="/" className={`${isActive==="tobacco"?"active":""} cursor-pointer`} onClick={()=>{
                                                                                                        setIsActive("tobacco");
                                                                                                        {window.location.pathname==="/"?
                                                                                                            scrollToSection("tobacco"):
                                                                                                            setTimeout(() => {
                                                                                                                scrollToSection("tobacco")
                                                                                                            }, );
                                                                                                        }
                                                                                                        

                                                                                                        
                                                                                                        
                                                                                                        }}>Tobacco</Link>
                    <Link to="/" className={`${isActive==="shisha"?"active":""} cursor-pointer`} onClick={()=>{
                                                                                                        setIsActive("shisha");
                                                                                                        {window.location.pathname==="/"?
                                                                                                            scrollToSection("shisha"):
                                                                                                            setTimeout(() => {
                                                                                                                scrollToSection("shisha")
                                                                                                            }, );
                                                                                                        }
                                                                                                        

                                                                                                        
                                                                                                        
                                                                                                        }}>Shisha</Link>
                    <Link to="/" className={`${isActive==="parts"?"active":""} cursor-pointer`}  onClick={()=>{
                                                                                                        setIsActive("parts");
                                                                                                        {window.location.pathname==="/"?
                                                                                                            scrollToSection("parts"):
                                                                                                            setTimeout(() => {
                                                                                                                scrollToSection("parts")
                                                                                                            }, );
                                                                                                        }
                                                                                                        

                                                                                                        
                                                                                                        
                                                                                                        }}>Parts</Link>
                    
                    <Link to="/" className={`${isActive==="contact"?"active":""} cursor-pointer`} onClick={()=>{
                                                                                                        setIsActive("contact");
                                                                                                        {window.location.pathname==="/"?
                                                                                                            scrollToSection("contact"):
                                                                                                            setTimeout(() => {
                                                                                                                scrollToSection("contact")
                                                                                                            }, );
                                                                                                        }
                                                                                                        

                                                                                                        
                                                                                                        
                                                                                                        }}>Contact</Link>
                    
                </ul>
            </div>

            <div className='right-nav hidden sm:flex items-center '>
                <ul className='flex items-center gap-3'>
                    <Link to="/cart" className={`${isActive==="cart"?"active":""} cursor-pointer`} onClick={()=>{setIsActive("cart");setShowPopup(false)}}>Cart</Link>
                    {loggedIn?
                    <li className='relative'>
                        <div className='ppContaier h-8 w-8 bg-tertiary rounded-2xl cursor-pointer' onClick={()=>setUserOptionsIsVisible(!userOptionsIsVisible)}></div>
                        <ul className={`h-16 w-36 bg-tertiary -bottom-20 right-0 bg-teriary absolute ${userOptionsIsVisible?"block":"hidden"}`}>
                            <li className='text-primary cursor-pointer'>Profile</li>
                            <li className='text-red-700 cursor-pointer' onClick={()=>{
                                        setLoggedIn(false);
                                        localStorage.removeItem("token");
                                        window.location.reload()
                                    }}>Log Out</li>
                        </ul>
                    </li>:
                    <li className='cursor-pointer bg-secondary rounded-xl p-1' onClick={()=>{setShowPopup(true);console.log(loggedIn)}}>Log in</li>}
                    
                </ul>
            </div>

            <div className='alternate sm:hidden my-auto relative cursor-pointer mr-3' onClick={()=>setBurgerOpen(prev=>!prev)}>
            Menu

                    <div className='absolute top-12 right-0 h-fit bg-tertiary rounded-md w-40'>
                        <ul className={` flex-col text-primary items-center gap-3 ${burgerOpen?"flex":"hidden"}`}>
                            
                            <Link to="/" className={`${isActive==="tobacco"?"active":""} cursor-pointer`} onClick={()=>{
                                                                                                        setIsActive("tobacco");
                                                                                                        {window.location.pathname==="/"?
                                                                                                            scrollToSection("tobacco"):
                                                                                                            setTimeout(() => {
                                                                                                                scrollToSection("tobacco")
                                                                                                            }, );
                                                                                                        }
                                                                                                        

                                                                                                        
                                                                                                        
                                                                                                        }}>Tobacco</Link>
                    <Link to="/" className={`${isActive==="shisha"?"active":""} cursor-pointer`} onClick={()=>{
                                                                                                        setIsActive("shisha");
                                                                                                        {window.location.pathname==="/"?
                                                                                                            scrollToSection("shisha"):
                                                                                                            setTimeout(() => {
                                                                                                                scrollToSection("shisha")
                                                                                                            }, );
                                                                                                        }
                                                                                                        

                                                                                                        
                                                                                                        
                                                                                                        }}>Shisha</Link>
                    <Link to="/" className={`${isActive==="parts"?"active":""} cursor-pointer`}  onClick={()=>{
                                                                                                        setIsActive("parts");
                                                                                                        {window.location.pathname==="/"?
                                                                                                            scrollToSection("parts"):
                                                                                                            setTimeout(() => {
                                                                                                                scrollToSection("parts")
                                                                                                            }, );
                                                                                                        }
                                                                                                        

                                                                                                        
                                                                                                        
                                                                                                        }}>Parts</Link>
                    
                    <Link to="/" className={`${isActive==="contact"?"active":""} cursor-pointer`} onClick={()=>{
                                                                                                        setIsActive("contact");
                                                                                                        {window.location.pathname==="/"?
                                                                                                            scrollToSection("contact"):
                                                                                                            setTimeout(() => {
                                                                                                                scrollToSection("contact")
                                                                                                            }, );
                                                                                                        }
                                                                                                        

                                                                                                        
                                                                                                        
                                                                                                        }}>Contact</Link>
                    
                    <Link to="/cart" className={`${isActive==="cart"?"active":""} cursor-pointer`} onClick={()=>setIsActive("cart")}>Cart</Link>
                            {loggedIn?
                            <li>
                                <div className='ppContaier h-8 w-8 bg-tertiary rounded-2xl relative'>s</div>
                                <ul className='options absolute top-10 h-screen w-screen bg-tertiary cursor-pointer'>
                                    <li className='text-primary'>
                                        Profile
                                    </li>
                                    <li className='text-primary' onClick={()=>{
                                        setLoggedIn(false)
                                        localStorage.removeItem()
                                    }}>
                                        logout
                                    </li>
                                </ul>
                            </li>:
                            <li className='cursor-pointer  rounded-xl p-1' onClick={()=>{setShowPopup(true);console.log(loggedIn)}}>Log in</li>}
                        </ul>
                    </div>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar