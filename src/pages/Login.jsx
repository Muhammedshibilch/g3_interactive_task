import React, { useState } from 'react'
import sign from '../assets/sign.png'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import loading from '../assets/loading.gif'

const Login = () => {
    const [showPassword, setShowPassword]=useState(false);
    const [email,setEmail]=useState('');
    const [errors,setErrors]=useState({});
    const [password,setPassword]= useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [loginError,setLoginError]=useState('');
    const [isLoading,setIsLoading]=useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        const newErrors = {};
        if(!email.trim()){
            newErrors.email = 'Email is required';

        }else if(!emailRegex.test(email)){
            newErrors.email = "Please enter a valid email address";

        }
        if(!password.trim()){
            newErrors.password = "password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const isFormValid = email.trim() && password.trim() && emailRegex.test(email);
    const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("ip_address", "220.233.36.40"); 

  try {
    const response = await fetch('/api/login', {
  method: 'POST',
  body: formData,
  headers: {
    Accept: 'application/json',
  },
});


    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Login successful"); 
      window.location.href='/users'
    } else {
      alert("Login failed ");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Error logging in.");
  }
};

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if(errors.email){
            setErrors(prev=> ({...prev,email: ""}));
        }
        if(loginError) setLoginError("");

    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if(errors.password){
            setErrors(prev => ({...prev,password: ''}));
        }
        if(loginError) setLoginError('');
    }
  return (
   
   <div className='flex items-center justify-center min-h-screen bg-gray-50 '>
    <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
                <img src={sign} alt="" />
            </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-600 text-center mb-2">
            Sign In to your Account
        </h1>
        <p className='text-gray-600 text-center mb-8'>
            Welcome back! Please enter your detail
        </p>

        <div className="space-y-6">
            {
                loginError && (
                    <div className='bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3'>
                        <AlertCircle className='h-5 w-5 text-red-500 flex-shrink-0'/>
                        <div className='text-sm text-red-700'>
                            {loginError}
                        </div>
                    </div>
                )
            }

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-envelope"></i>
                </div>
                <input type="email" className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ?"border-red-300 bg-red-50" : "border-gray-300"} `} placeholder='Enter your email' value={email} onChange={handleEmailChange} />
                {errors.email &&(
                    <div className='mt-1 text-sm text-red-600 flex items-center space-x-1'>
                        <AlertCircle className='h-4 w-4'/>
                        <span>{errors.email}</span>
                    </div>
                )}
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-lock"></i>
                </div>
                <input type={showPassword ? "text" : "password"} className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-300 bg-red-50 ' : 'border-gray-300'} `} placeholder='Enter Your Password' value={password} onChange={handlePasswordChange} />
                <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={()=>setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <EyeOff className='h-5 w-5 text-gray-400'/>
                    ):(
                        <Eye className='h-5 w-5 text-gray-400'/>
                    )}
                </button>
                {errors.password && (
                    <div className='mt-1 text-sm text-red-600 flex items-center space-x-1'>
                        <AlertCircle className='h-4 w-4'/>
                        <span>{errors.password}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input type="checkbox" id='remember-me' className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' checked={rememberMe} onChange={(e)=>setRememberMe(e.target.checked)} />
                    <label htmlFor='remember-me' className='ml-2 text-sm text-gray-600'>Remember me</label>
                </div>
                <button className='text-sm text-blue-600 hover:text-blue-500'>
                    Forget Password?
                </button>
            </div>
            <button type='button' className={`w-full py-3 px-3 rounded-lg font-medium transition duration-200 flex items-center justify-center ${isFormValid && !isLoading ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={handleSubmit} disabled={!isFormValid || isLoading}>
                {isLoading ? (
                    <>
                    <img src={loading} alt="" />
                    Signing In ..
                    </>

                ) : (
                    "Sign In"
                )}
            </button>
        </div>
    </div>

   </div>
   
    
  )
}

export default Login