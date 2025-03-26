import { Route, Routes } from 'react-router-dom'
import Layout from '../Components/Layout'
import HomePage from '../pages/HomePage'
import ContactUs from '../pages/ContactUs'
import SiteMap from '../pages/SiteMap'
import Shop from '../pages/Shop'
import LoginRegister from '../pages/auth_pages/Login_Register'
import Services from '../pages/Services'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'

const Routers = () => {
  return (
    <div><Routes>
    <Route path="/" element={<Layout><HomePage /></Layout>}></Route>
    <Route path="/contactUs" element={<Layout><ContactUs /></Layout>}></Route>
    <Route path="/sitemap" element={<Layout><SiteMap /></Layout>}></Route>
    <Route path="/shop" element={<Layout><Shop /></Layout>}></Route>
    <Route path="/user" element={<Layout><LoginRegister /></Layout>}></Route>
    <Route path="/services" element={<Layout><Services /></Layout>}></Route>
    <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>}></Route>
    <Route path="/cart" element={<Layout><Cart /></Layout>}></Route>
    <Route
      path="*"
      element={
        <div>
          <p>Sorry there is no route matches</p>
        </div>
      }
    />
  </Routes></div>
  )
}

export default Routers