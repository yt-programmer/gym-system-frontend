import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./hooks/useAuth";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { PlansPage } from "./pages/PlansPage";
import { PlanDetailsPage } from "./pages/PlanDetailsPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { CardPage } from "./pages/CardPage";
import { CheckCardPage } from "./pages/CheckCardPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import RequireAuth from "./components/protect/RequireAuth";
const socket = io(import.meta.env.VITE_API, {
  withCredentials: true,
});

function App() {
  const [Visitor, setVisitor] = useState(0);

  useEffect(() => {
    socket.on("visitor", (count) => {
      setVisitor(count);
    });

    return () => {
      socket.off("visitor");
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage Visitor={Visitor} />,
        },
        {
          path: "/plans",
          element: <PlansPage />,
        },
        {
          path: "/plans/:planId",
          element: <PlanDetailsPage />,
        },
        {
          path: "/checkout",
          element: (
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          ),
        },
        {
          path: "/card",
          element: (
            <RequireAuth requireSub={true}>
              <CardPage />
            </RequireAuth>
          ),
        },
        {
          path: "/checkcard/:token",
          element: <CheckCardPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/dashboard",
          element: (
            <RequireAuth requireAdmin={true}>
              <DashboardPage Visitor={Visitor} />
            </RequireAuth>
          ),
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
