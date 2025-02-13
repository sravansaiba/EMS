import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AuthContext from "./context/authContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";
import SummaryCard from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBasedRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />}></Route>

            {/* department */}
            <Route
              path="/admin-dashboard/departments"
              element={<DepartmentList />}
            ></Route>
            <Route
              path="/admin-dashboard/add-department"
              element={<AddDepartment />}
            ></Route>
            <Route
              path="/admin-dashboard/department/:id"
              element={<EditDepartment />}
            ></Route>

            {/* employees */}
            <Route path="/admin-dashboard/employees" element={<List />}></Route>
            <Route
              path="/admin-dashboard/add-employee"
              element={<Add />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/:id"
              element={<View />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/edit/:id"
              element={<Edit />}
            ></Route>

            {/* salary */}
            <Route
              path="/admin-dashboard/salary/add"
              element={<AddSalary />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/salary/:id"
              element={<ViewSalary />}
            ></Route>

          {/* leaves */}
          <Route
              path="/admin-dashboard/leaves"
              element={<Table />}
            ></Route>
          <Route
              path="/admin-dashboard/leaves/:id"
              element={<Detail/>}
            ></Route>


          </Route>

          


          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                  <EmployeeDashboard />
                </RoleBasedRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<SummaryCard />}></Route>

            <Route
              path="/employee-dashboard/profile/:id"
              element={<View />}
            ></Route>

            <Route
              path="/employee-dashboard/leaves"
              element={<LeaveList />}
            ></Route>

            <Route
              path="/employee-dashboard/add-leave"
              element={<AddLeave />}
            ></Route>

             <Route
              path="/employee-dashboard/salary/:id"
              element={<ViewSalary />}
            ></Route>

            <Route
              path="/employee-dashboard/setting"
              element={<Setting/>}
            ></Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
