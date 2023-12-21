const express = require('express');
const path=require('path');
const {engine} = require('express-handlebars');
const routerProducts = require('./routes/products.router');
const {Server} = require('socket.io')
const routerCarts = require('./routes/carts.router');
const routerViews = require('./routes/views.router');
const FileStore = require('session-file-store');
const sessions = ('express-session');
const mongoose = require('mongoose');
//const handlebars = require('express-handlebars')

fileStore = FileStore(sessions)


// const productosModel = require('./dao/models/productos.model.js')
// const cartsModel = require('./dao/models/carts.model.js')
// const messageModel =require('./dao/models/carts.model.js')



const PORT = 8080 
const app = express();

const server = app.listen(PORT, () => console.log("Server online port " + PORT))

const io = new Server(server)


app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use(sessions({
//     //store:
//     secret: "******",
//     resave:true,
//     saveUninitialized:true
// }))

app.use(express.static(path.join(__dirname,'/public')));



//app.engine('handlebars', handlebars.engine());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));


app.use('/', routerViews)
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)



async function dataBase(){
    try {
        //await mongoose.connect('mongodb+srv://oliveiradiogo00:**********@cluster0.pgeuig7.mongodb.net/?retryWrites=true&w=majority',{dbName:'carts'})
        await mongoose.connect('mongodb+srv://oliveiradiogo00:********@cluster0.pgeuig7.mongodb.net/?retryWrites=true&w=majority',{ dbName:'ecommerce'})
        console.log('DB online')
    } catch (error) {
        console.log(error.message)        
    }
}

dataBase()


//module.exports = {io}



