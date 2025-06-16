import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Login = () => {
    const handleSuccess = async(googleRes)=>{
        console.log(googleRes.credential);
        
        try {
            const idToken = googleRes.credential;

            const res = await axios.post("http://localhost:3001/api/google", {googletoken: idToken});

            alert("Login successfull");

            console.log(res);

        } catch (error) {
            console.log("Error in login", error);
        }
    }
    const handleError = (err)=>{
        console.log("error in login", err);
    }
  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  )
}

export default Login
