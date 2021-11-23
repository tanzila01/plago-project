
import React from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import NotFound from './NotFound';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import AdminEditProduct from './AdminEditProduct';
import AdminHome from './AdminHome';
import './App.css'
import ViewImageDescription from './viewImageDescription';
import AdminSignin from './adminSignin';
import Cart from './Cart';
import Checkout from './checkout';
import Orders from './orders'
import AcceptedOrders from './acceptedOrders';
import DeclinedOrders from './declinedOrders';

const App = () => {

    return (
    <BrowserRouter>
     <main>
         <Switch>
             <Route exact path="/">
             {/* <Header /> */}
              <Home />
            </Route>
             <Route exact path="/signin">
             <Header />
              <Signin />
            </Route>
            <Route exact path="/adminSignin">
              <Header/>
              <AdminSignin/>
            </Route>
            <Route exact path="/signup">
             <Header />
              <Signup />
            </Route>
             <UserRoute exact path="/user/dashboard" component={UserDashboard} />
             <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
             <AdminRoute exact path="/admin/edit/product/:productId" component={AdminEditProduct} />
             <AdminRoute exact path="/admin/home" component={AdminHome} />
             <Route exact path="/image" component={ViewImageDescription} />
             <UserRoute exact path="/user/dashboard/cart" component={Cart} />
             <UserRoute exact path="/user/dashboard/cart/checkout" component={Checkout} />
             <AdminRoute exact path="/admin/dashboard/orders" component={Orders} />
             <AdminRoute exact path="/admin/dashboard/orders/accepted" component={AcceptedOrders} />
             <AdminRoute exact path="/admin/dashboard/orders/declined" component={DeclinedOrders} />

             <Route component={NotFound} />

         </Switch>
     </main>
    </BrowserRouter>
    )
}

export default App
