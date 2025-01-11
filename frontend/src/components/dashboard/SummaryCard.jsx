

const SummaryCard = ({icon,text,num,color}) => {
  return (
    <div className="flex bg-gray-100 rounded">
        <div className={`text-3xl flex items-center justify-center ${color} text-white px-4`}>
             {icon}
        </div>
        <div className="pl-4 py-1">
            <p className="text-lg font-semibold">{text}</p>
            <p className="text-xl font-bold">{num}</p>
        </div>      
    </div>
  )
}

export default SummaryCard
