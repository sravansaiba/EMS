import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"



const userContext=createContext()



const AuthContext = ({children}) => {

    const [user,setUser]=useState("")
    const [loading,setLoading]=useState("false")

    useEffect(()=>{
        const verifyUser =async () =>{
            try {
                setLoading(true)

                const token =localStorage.getItem('token')

                if(token){
                    const response= await axios.get("http://localhost:4000/api/auth/verify",{
                        headers:{
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    if(response.data.success){
                        setUser(response.data.user)
                    }
                }
                else{
                    setUser(null)
                    setLoading(false)
                }
            
            } catch (error) {
                console.log(error);
                
                if (error.response && !error.response.data.error){
                   setUser(null)
                }
            }
            finally{
                setLoading(false)
            }
        }
        verifyUser()
    },[])

    const login =(user)=>{
        setUser(user)
    }

    const logout=()=>{
        setUser(null)
        localStorage.removeItem("token")

    }

  return (
   <userContext.Provider value={{user,login,logout,loading}}>
    {children}
   </userContext.Provider>
  )
}

export const useAuth = () =>useContext(userContext);

export default AuthContext
