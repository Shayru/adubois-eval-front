import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ConnexionPage from "./Page/ConnexionPage.jsx";
import AccueilPage from "./Page/AccueilPage.jsx";
import ProductsPage from "./Page/ProductsPage.jsx";
import OrdersPage from "./Page/OrdersPage.jsx";
import ProfilPage from "./Page/ProfilPage.jsx";
import InscriptionPage from "./Page/InscriptionPage.jsx";
import ProtectedRoute from "./component/Security/ProtectedRoute.jsx";
import DashboardPage from "./Page/DashboardPage.jsx";
import DeconnexionPage from "./Page/DeconnexionPage.jsx";
import AdminRoute from "./component/Security/AdminRoute.jsx";
import HomePage from "./Page/HomePage.jsx";
import React from "react";
import {AuthContext, AuthProvider} from "./component/AuthContext.jsx";
import DashboardProductsPage from "./Page/DashboardProductsPage.jsx";
import DashboardProductsCreatePage from "./Page/DashboardProductsCreatePage.jsx";
import CheckoutPage from "./Page/CheckoutPage.jsx";
import PaymentPage from "./Page/PaymentPage.jsx";

function App() {
    const Redirect = () => {
        const { isAuthenticated, isAdmin } = React.useContext(AuthContext);
        if (!isAuthenticated) {
            return <Navigate to="/accueil" />;
        } else if (isAdmin) {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/home" />;
        }
    };


  return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Redirect />} />
                  <Route path="/accueil" element={<AccueilPage />} />
                  <Route path="/dashboard" element={<AdminRoute redirectTo="/"><DashboardPage /></AdminRoute>} />
                  <Route path="/dashboard/products" element={<AdminRoute redirectTo="/"><DashboardProductsPage /></AdminRoute>} />
                  <Route path="/dashboard/products/create" element={<AdminRoute redirectTo="/"><DashboardProductsCreatePage /></AdminRoute>} />
                  <Route path="/home" element={<ProtectedRoute redirectTo="/"><HomePage /></ProtectedRoute>} />
                  <Route path="/connexion" element={<ConnexionPage />} />
                  <Route path="/deconnexion" element={<DeconnexionPage />} />
                  <Route path="/inscription" element={<InscriptionPage />} />
                  <Route path="/products" element={<ProtectedRoute redirectTo="/"><ProductsPage /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute redirectTo="/"><OrdersPage /></ProtectedRoute>} />
                  <Route path="/checkout/:orderId" element={<CheckoutPage />} />
                  <Route path="/payment/:orderId" element={<PaymentPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  )
}

export default App
