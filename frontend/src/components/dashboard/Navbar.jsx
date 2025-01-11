import { useAuth } from "../../context/authContext"


const Navbar = () => {

    const {user,logout}=useAuth()

  return (
    <div className="flex items-center justify-end gap-6 h-14 bg-purple-500">
      <p className="text-lg text-white font-lex">Welcome {user.name}</p>
      <button className="px-4 py-1 bg-white rounded-lg mr-4" onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
