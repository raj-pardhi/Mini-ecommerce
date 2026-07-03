import PrivateRoute from "@/components/Routes/PrivateRoute";

export default function UserDashboardLayout({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
