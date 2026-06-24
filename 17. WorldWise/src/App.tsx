import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Homepage = lazy(() => import("./pages/Homepage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AppPage = lazy(() => import("./pages/AppPage"));

import CitiesList from "./components/CitiesList";
import CountriesList from "./components/CountriesList";
import CityDetails from "./components/CityDetails";
import Form from "./components/Form";
import CitiesProvider from "./contexts/CitiesProvider";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

export type TCity = {
  cityName: string;
  country: string;
  emoji: string;
  date: string; // ISO 8601 -> YYYY-MM-DD
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id?: string;
};

function App() {
  // TOLEARN think about <Navigate/> component as about redirect

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppPage />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CitiesList />} />
                <Route path="cities/:id" element={<CityDetails />}></Route>
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
