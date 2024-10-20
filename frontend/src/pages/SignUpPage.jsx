import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            console.log("SignUp SucessFull", response.data)
            navigate('/login')
        }catch (error) {
            console.log("Error in signUp", error.response.data)
        }
    }



    return (
        <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Enter your Name"
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Email address"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-900 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
    )
}

export default SignUpPage