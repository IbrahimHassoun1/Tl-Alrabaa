import React, { useContext, useEffect, useState } from 'react';
React
import { MyContext } from '../../context/Context';
import axios from 'axios';

const Popup = () => {
    const { hasAccount, setHasAccount, setShowPopup, URL, setToken, setLoggedIn } = useContext(MyContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const totalSteps = 3;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const submit = async (event) => {
        event.preventDefault();
        let newURL = URL;

        if (hasAccount) {
            newURL += "/api/user/login";
        } else {
            newURL += "/api/user/signUp";
        }

        console.log(newURL);

        try {
            const response = await axios.post(newURL, data);
            console.log("This is the whole response", response);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowPopup(false);
                setLoggedIn(true);
                setErrorMessage(""); // Clear error on success
                
            } else {
                console.log("Response indicates failure:", response.data.message);
                setErrorMessage(response.data.message);
            }

        } catch (error) {
            console.error("Error occurred:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
            setErrorMessage(errorMessage);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const triggerNextStep=(event)=>{
        event.preventDefault();
        nextStep();
    }


    return (
        
        <div className="flex fixed w-screen min-h-screen">
            <div className="popup z-10 h-full w-full opacity-50 bg-black absolute flex justify-center" onClick={()=>setShowPopup(false)}></div>
            <div className="containers  z-20 w-full h-full flex justify-center m-auto">
                <div className="popupcontent w-full h-fit sm:w-4/6 sm:h-4/6 sm:left top-0 sm:top-10 bg-primary absolute z-30 rounded-xl flex flex-col ">
                    <div className="upper flex justify-end text-tertiary font-extrabold text-3xl mb-5 mr-5 mt-5">
                        <h1 className="cursor-pointer" onClick={() => setShowPopup(false)}>X</h1>
                    </div>

                    <div className="lower flex flex-wrap">
                        <div className="Left w-full sm:w-3/6 flex text-tertiary">
                            <div className="content sm:w-4/6 containers mx-auto">
                                <div className="">
                                    {hasAccount ? (
                                        <div className=''>
                                            <h1 className='text-3xl font-bold mb-4'>Log in</h1>
                                            <p className='font-extralight text-sm'> or choose one of the following methods to login:</p>
                                        </div>
                                    ) : (
                                        <div className='mx-auto'>
                                            <h1 className='text-3xl font-bold mb-4'>Create account</h1>
                                            <p className='font-extralight text-sm'>or choose one of the following methods to create a new account:</p>
                                        </div>
                                    )}
                                    <hr className='bg-tertiary sm:w-3/6 mx-auto mt-5' />
                                    <div className='buttons flex flex-col w-full items-center text-tertiary gap-2 mt-5'>
                                        <button className='bg-secondary h-7 w-full rounded-lg'>Google</button>
                                        <button className='bg-secondary h-7 w-full rounded-lg'>Apple</button>
                                        <button className='bg-secondary h-7 w-full rounded-lg'>Facebook</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Right flex flex-col w-full sm:w-3/6 m-auto gap-3' >
                            <div className='containers m-auto w-full'>
                            {hasAccount ? (
                                <form className='flex flex-col gap-3 w-full' onSubmit={submit}>
                                    <h1 className='text-tertiary font-bold text-3xl'>Credentials</h1>
                                    <input onChange={handleChange} type="email" placeholder='Email' className='p-2 rounded-xl' name='email' value={data.email || ""} required />
                                    <input onChange={handleChange} type="password" placeholder='Password' className='p-2 rounded-xl' name='password' value={data.password || ""} required />
                                    
                                    <button type="submit" className='bg-tertiary rounded-lg w-1/2 m-auto h-8'>Login</button>
                                </form>
                            ) : (
                                <>
                                    {currentStep === 1 && (
                                        <form className='flex flex-col gap-3' onSubmit={triggerNextStep}>
                                            <h1 className='text-tertiary font-bold text-3xl'>Personal Information</h1>
                                            <input onChange={handleChange} type="text" placeholder='First Name' className='p-2 rounded-xl' name='firstName' value={data.firstName || ""} required />
                                            <input onChange={handleChange} type="text" placeholder='Last Name' className='p-2 rounded-xl' name='lastName' value={data.lastName || ""} required />
                                            <input onChange={handleChange} type="tel" placeholder='Phone Number' className='p-2 rounded-xl' name='phone' value={data.phone || ""} required />
                                            <div className='flex justify-between'>
                                                <button type="submit" className='bg-secondary text-tertiary rounded-lg w-1/2 h-8 ml-auto' >
                                                    Next
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                    {currentStep === 2 && (
                                        <form onSubmit={triggerNextStep} className='flex flex-col gap-3'>
                                            <h1 className='text-tertiary font-bold text-3xl'>Address</h1>
                                            <input onChange={handleChange} type="text" placeholder='Street' className='p-2 rounded-xl' name='street' value={data.street || ""} required />
                                            <input onChange={handleChange} type="text" placeholder='City' className='p-2 rounded-xl' name='city' value={data.city || ""} required />
                                            <input onChange={handleChange} type="text" placeholder='Country' className='p-2 rounded-xl' name="country" value={data.country || ""} required />
                                            <div className='flex justify-between'>
                                                <button type="button" className='bg-gray-300 rounded-lg w-1/2 h-8' onClick={prevStep}>
                                                    Previous
                                                </button>
                                                <button type="submit" className='bg-secondary text-tertiary rounded-lg w-1/2 h-8' >
                                                    Next
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                    {currentStep === 3 && (
                                        <form onSubmit={()=>{submit}} className='gap-3 flex flex-col'>
                                            <h1 className='text-tertiary font-bold text-3xl'>Credentials</h1>
                                            <input onChange={handleChange} type="email" placeholder='Email' className='p-2 rounded-xl' name="email" value={data.email || ""} required />
                                            <input onChange={handleChange} type="password" placeholder='Password' className='p-2 rounded-xl' name='password' value={data.password || ""} required />
                                            <div className='flex justify-between'>
                                                <button type="button" className='bg-gray-300 rounded-lg w-1/2 h-8' onClick={prevStep}>
                                                    Previous
                                                </button>
                                                <button type="submit" className='bg-secondary text-tertiary rounded-lg w-1/2 h-8'>Sign Up</button>
                                            </div>
                                        </form>
                                    )}
                                </>
                            )}
                            {/* Display error message if it exists */}
                            {errorMessage && <div className='text-red-500 mt-4'>{errorMessage}</div>}
                            <p className='text-tertiary '>
                                {hasAccount?<>
                                    Don&apos;t Have An Account? 
                                    <span className='underline cursor-pointer text-secondary ml-1' onClick={() => setHasAccount(false)}>Sign Up</span>
                                            </>:<>
                                    Already Have An Account? 
                                    <span className='underline cursor-pointer text-secondary ml-1' onClick={() => setHasAccount(true)}>Login</span>
                                                </>}
                                                
                              
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
