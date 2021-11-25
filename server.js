
const express = require('express')
const app = express()
const connectDB = require('./database/db')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser  = require('cookie-parser')
const port = process.env.PORT || 5000
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const CartRoutes = require('./routes/cart')
const CheckoutRoutes = require('./routes/checkout')
const OrdersRoutes = require('./routes/orders')

connectDB()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes);
app.use('/api/category' , categoryRoutes)
app.use('/api/product' , productRoutes)
app.use('/api/cart', CartRoutes)
app.use('/api/checkout', CheckoutRoutes)
app.use('/api/orders', OrdersRoutes)
app.use('/uploads' , express.static('uploads') )

// app.get('/' , (req,res) =>{
//     res.send("inside server")
// })

app.listen(port, () => console.log(`listning on port ${port}`))