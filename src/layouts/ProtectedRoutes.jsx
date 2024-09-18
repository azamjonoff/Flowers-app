// rrd
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ admin, children }) {
  if (admin) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
