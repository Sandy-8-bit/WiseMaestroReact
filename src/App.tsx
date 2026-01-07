import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";


import { lazy, Suspense } from "react";
import { Spinner } from "./ui/Layout/Mainlayout/Spinner";
import { ProtectedRoute } from "./utils/ProtectedRoute";

/* -------------------------------------------------------------------------- */
/*                                AUTH PAGES                                  */
/* -------------------------------------------------------------------------- */

export const SignInPage = lazy(() => import("./pages/auth/SignInPage"));

export const SignupPage = lazy(() => import("./pages/auth/SignUpPage"));



/* -------------------------------------------------------------------------- */
/*                                LAYOUTS                                     */
/* -------------------------------------------------------------------------- */


export const MainLayout = lazy(
  () => import("./ui/Layout/Mainlayout/MainLayout")
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>


      
        <Route path={appRoutes.auth.signIn} element={<SignInPage />} />
        <Route path={appRoutes.auth.signUp} element={<SignupPage />} />

        {/* 🔹 Main authenticated layout */}
        <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />} >
           <Route path={appRoutes.landingPage} element={<h1>Landing page</h1>} />
       <Route path={appRoutes.home} element={<h1>This is home</h1>} />
       </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
