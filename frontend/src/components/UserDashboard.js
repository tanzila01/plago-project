

import React, {useEffect} from 'react'
import Header from './Header';
import AdminHeader from './AdminHeader';
import AdminBody from './AdminBody';
import {useDispatch} from 'react-redux';
import {getCategories} from '../redux/actions/categoryAction';
import {getProducts} from '../redux/actions/productAction';
import AdminViewCategoryModal from './AdminViewCategoryModal';

const UserDashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
     dispatch(getCategories())
    }, [dispatch])
    useEffect(() => {
     dispatch(getProducts())
    }, [dispatch])
    return (
        <div>
             <Header/>
             <AdminHeader />
            <AdminViewCategoryModal />             
            <AdminBody/>
        </div>
    )
}

export default UserDashboard
