import { FaUser } from "react-icons/fa"
import { useAuth } from "../../context/authContext"

const SummaryCard = () => {
    const {user}=useAuth()
  return (

    <div className="flex bg-gray-100 rounded mt-5 mx-3">
    <div className={`text-3xl flex items-center justify-center bg-purple-500 text-white px-4`}>
         <FaUser/>
    </div>
    <div className="pl-4 py-1">
        <p className="text-lg font-semibold">Welcome Back</p>
        <p className="text-xl font-bold">{user.name}</p>
    </div>      
</div>

  )
}

export default SummaryCard
