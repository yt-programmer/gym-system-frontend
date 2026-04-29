import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RequireAuth = ({
  children,
  requireSub = false,
  requireAdmin = false,
}) => {
  const { user, loading, isSubscribed, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireSub && !isSubscribed) {
    return <Navigate to="/plans" replace />;
  }

  return children;
};

export default RequireAuth;
