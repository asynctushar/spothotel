import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => (
  <div className="admin-shell">
    <Sidebar />
    <div className="admin-content">
      <AdminNavbar />
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
