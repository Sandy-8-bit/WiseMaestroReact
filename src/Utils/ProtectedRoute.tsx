import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/utils/authHandler";
import { appRoutes } from "@/routes/appRoutes";

interface Props {
  redirectTo?: string;
}

export const ProtectedRoute = ({
  redirectTo = appRoutes.auth.signIn,
}: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
