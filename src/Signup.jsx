import React, { useEffect } from 'react'
import { useState } from 'react';
import sign from '../src/assets/signup.png'
 // Adjust the path as needed

const SignUp = () => {
    const initialvalues = {username:"", email:"",password:"",confirm_password:""};
    const [formValues,setFormValues]=useState(initialvalues);
    const [formErrors,setFormErrors]=useState({});
    const [isSubmit,setIsSubmit] =useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };

    const handleChange =(e) =>{
        const {name,value} =e.target;
        setFormValues({...formValues,[name]:value });
        console.log(formValues);
    };
    const handleSubmit =(e)=>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }

    },[formErrors])
    const validate=(values)=>{
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username){
            errors.username='Username is required!';
        }
        if(!values.email){
            errors.email='Email is required!';
        }else if(!regex.test(values.email)){
            errors.email='not valid email format!';
        }
        if(!values.password){
            errors.password='Password is required!';
        }else if(values.password.length <4){
            errors.password="Password must be more than 4 character"
        }else if(values.password.length >10 ){
            errors.password="Password cannot exceed more than 10 characters";
        }
        if(!values.confirm_password){
            errors.confirm_password='confirm_password is required!';
        }else if(!values.password == values.confirm_password){
            errors.confirm_password='Password is not match !';
        }
        return errors;

    } 



  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      <div className="md:w-1/2 lg:w-2/5 p-8 bg-white rounded-lg shadow-md">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className='ui message success text-green-800 text-center font-bold'>signed succesfully</div>
      ):("")}
        <h2 className="text-2xl font-bold mb-16 text-gray-900">Sign UP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input type="text" name="username"
             className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder='Enter your name' 
              value={formValues.username}
              onChange={handleChange}/>
               <p className='text-red-600'>{formErrors.username}</p>
          </div>
          {/* <p>{formErrors.username}</p> */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name='email'
             className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" 
             placeholder='Enter your email' value={formValues.email}
             onChange={handleChange}/>
              <p className='text-red-600'>{formErrors.email}</p>
          </div>
         
          <div className="mb-4">
            <label className="block text-gray-700"> Password</label>
            <input type={passwordShown ? 'text' : 'password'} name='password' 
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" 
            placeholder='Enter your password' 
            value={formValues.password}
            onChange={handleChange}/>
            <button type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-2 text-gray-600 hover:text-gray-800">
          </button>
            <p className='text-red-600'>{formErrors.password}</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700">Confirm_password</label>
            <input type="password" name='confirm_password' 
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
             placeholder='Enter confirm password'
              value={formValues.confirm_password}
             onChange={handleChange}/>
              <p className='text-red-600'>{formErrors.confirm_password}</p>
          </div>
          
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Sign Up</button>
        </form>
      </div>
      <div className="hidden md:block md:w-3/5 lg:w-2/5 p-8 bg-blue-900">
        <img src={sign} alt="Sign Up" className="object-cover h-full w-full" />
      </div>
    </div>
  );
};

export default SignUp;
