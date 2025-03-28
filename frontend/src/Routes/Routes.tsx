// import { Route, Routes } from 'react-router-dom'
// import Layout from '../Components/Layout'
// import HomePage from '../pages/HomePage'
// import ContactUs from '../pages/ContactUs'
// import SiteMap from '../pages/SiteMap'
// import Shop from '../pages/Shop'
// import LoginRegister from '../pages/auth_pages/Login_Register'
// import Services from '../pages/Services'
// import ProductDetail from '../pages/ProductDetail'
// import Cart from '../pages/Cart'

// const Routers = () => {
//   return (
//     <div><Routes>
//     <Route path="/" element={<Layout><HomePage /></Layout>}></Route>
//     <Route path="/contactUs" element={<Layout><ContactUs /></Layout>}></Route>
//     <Route path="/sitemap" element={<Layout><SiteMap /></Layout>}></Route>
//     <Route path="/shop" element={<Layout><Shop /></Layout>}></Route>
//     <Route path="/user" element={<Layout><LoginRegister /></Layout>}></Route>
//     <Route path="/services" element={<Layout><Services /></Layout>}></Route>
//     <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>}></Route>
//     <Route path="/cart" element={<Layout><Cart /></Layout>}></Route>
//     <Route
//       path="*"
//       element={
//         <div>
//           <p>Sorry there is no route matches</p>
//         </div>
//       }
//     />
//   </Routes></div>
//   )
// }

// export default Routers

import { Route, Routes } from "react-router-dom"
import Layout from "../Components/Layout"
import HomePage from "../pages/HomePage"
import ContactUs from "../pages/ContactUs"
import SiteMap from "../pages/SiteMap"
import Shop from "../pages/Shop"
import LoginRegister from "../pages/auth_pages/Login_Register"
import Services from "../pages/Services"
import ProductDetail from "../pages/ProductDetail"
import Cart from "../pages/Cart"
import DeliveryPolicy from "../pages/DeliveryPolicy"
import AboutUs from "../pages/AboutUs"
import TermsConditions from "../pages/TermsConditions"
import PrivacyPolicy from "../pages/PrivacyPolicy"

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/contactUs"
        element={
          <Layout>
            <ContactUs />
          </Layout>
        }
      />
      <Route
        path="/sitemap"
        element={
          <Layout>
            <SiteMap />
          </Layout>
        }
      />
      <Route
        path="/shop"
        element={
          <Layout>
            <Shop />
          </Layout>
        }
      />
      <Route
        path="/user"
        element={
          <Layout>
            <LoginRegister />
          </Layout>
        }
      />
      <Route
        path="/services"
        element={
          <Layout>
            <Services />
          </Layout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Layout>
            <ProductDetail />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/delivery_policy"
        element={
          <Layout>
            <DeliveryPolicy />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutUs />
          </Layout>
        }
      />
      <Route
        path="/terms"
        element={
          <Layout>
            <TermsConditions />
          </Layout>
        }
      />
      <Route
        path="/privacy"
        element={
          <Layout>
            <PrivacyPolicy />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <div className="container mx-auto px-4 py-16 text-center">
              <h1 className="text-3xl font-bold text-primary mb-4">Page Not Found</h1>
              <p className="text-muted-foreground mb-8">Sorry, the page you are looking for doesn't exist.</p>
              <a href="/" className="text-primary hover:underline">
                Return to Home
              </a>
            </div>
          </Layout>
        }
      />
    </Routes>
  )
}

export default Routers

