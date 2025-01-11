import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewSalary = () => { 
  const [salaries, setSalaries] = useState([]);
  const [loading, setloading] = useState(false);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const {id}=useParams()
    let sno=1;

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        setloading(true);
        const response = await axios.get(`http://localhost:4000/api/salary/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setSalaries(response.data.salary);
          setFilteredSalaries(response.data.salary);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      } finally {
        setloading(false);
      }
    };

    fetchSalary();
  }, []);

  const filterSalaries = (e) => {
    const records = salaries.filter((leave) =>
      leave.employeeId.toLocaleLowerCase().includes(e.toLocaleLowerCase())
    );
    setFilteredSalaries(records);
  };

  return (
    <>
      {filterSalaries === null ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Salary History</h3>
          </div>

          <div className="flex justify-end items-center my-3">
            <input
              type="text"
              onChange={filterSalaries}
              placeholder="Search By Emp ID"
              className="px-2 py-0.5 border border-black rounded-md"
            />

          </div>

         {filteredSalaries.length>0?
         <table className="w-full text-sm text-left text-gray-500 mt-5">
           <thead className="text-xs text-black uppercase bg-gray-50 border border-black">
            <tr>
                 <th className="px-6 py-3">SNO</th>
                 <th className="px-6 py-3">EMP ID</th>
                 <th className="px-6 py-3">Salary</th>
                 <th className="px-6 py-3">Allowance</th>
                 <th className="px-6 py-3">Deduction</th>
                 <th className="px-6 py-3">Total</th>
                 <th className="px-6 py-3">Pay Date</th>
            </tr>
           </thead>
           <tbody>

            {filteredSalaries.map((salary)=>(
                <tr
                key={salary._id}
                className="bg-slate-50 border border-black">
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">{new Date(salary.payDate).toLocaleString()}</td>

                </tr>
            ))}

           </tbody>
         </table>:
         <div>No Records Found</div>}
        
          
        </div>
      )}
    </>
  );
};

export default ViewSalary;
