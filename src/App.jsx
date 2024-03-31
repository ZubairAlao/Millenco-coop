import Home from "./pages/Home"
import Layout from "./components/Layout"
import NotFound from "./pages/NotFound"
import Error from "./components/Error"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import AboutUsPage from "./pages/AboutUsPage"
import ServicesPage from "./pages/ServicesPage"
import MembershipPage from "./pages/MembershipPage"
import ContactPage from "./pages/ContactPage"
import FAQsPage from "./pages/FAQsPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import TermsConditions from "./pages/TermsConditions"
import DepositPage from "./pages/DepositPage"
import LoanApplicationPage from "./pages/LoanApplicationPage"
import UserDashboardPage from "./pages/UserDashboardPage"
import UserProfile from "./pages/user/UserProfile"
import UserDashboardLayout from "./components/UserDashboardLayout"
import UserTransactions from "./pages/user/UserTransactions"
import PaymentGateWay from "./pages/PaymentGateWay"
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage"





const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route  
      path="about"
      element={<AboutUsPage />}
      errorElement={<Error />}
    />

  <Route  
    path="services"
    element={<ServicesPage />}
    errorElement={<Error />}
  />

  <Route  
    path="faqs"
    element={<FAQsPage />}
    errorElement={<Error />}
  />

  <Route  
    path="membership"
    element={<MembershipPage />}
    errorElement={<Error />}
  />

  <Route  
    path="contact"
    element={<ContactPage />}
    errorElement={<Error />}
  />

  <Route  
    path="login"
    element={<LoginPage />}
    errorElement={<Error />}
  />
  <Route  
    path="sign-up"
    element={<SignUpPage />}
    errorElement={<Error />}
  />

  <Route  
    path="terms-conditions"
    element={<TermsConditions />}
    errorElement={<Error />}
  />

    <Route  
      path="payment"
      element={<PaymentGateWay />}
      errorElement={<Error />}
    />

    <Route  
      path="payment-success"
      element={<PaymentSuccessPage />}
      errorElement={<Error />}
    />

  <Route path="user-dashboard" element={<UserDashboardLayout/>}>
    <Route index element={<UserDashboardPage />}  errorElement={<Error />}/>
    <Route  
      path="deposit"
      element={<DepositPage />}
      errorElement={<Error />}
    />

    <Route  
      path="apply-loan"
      element={<LoanApplicationPage />}
      errorElement={<Error />}
    />

    <Route  
      path="user-profile"
      element={<UserProfile />}
      errorElement={<Error />}
    />

    <Route  
      path="user-transactions"
      element={<UserTransactions />}
      errorElement={<Error />}
    />
  </Route>

    <Route path="*"  element={<NotFound />} />
  </Route>
))

function App() {

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  )
}

export default App
