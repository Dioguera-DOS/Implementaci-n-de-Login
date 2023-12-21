const { Router } = require('express');
const router = Router()
//const io = require('../app');
const productosModel = require('../dao/models/productos.model')
//const ProductManager = require('../dao/manager/productManager');


//const productManager = new ProductManager();

// let listTest = {
//     name: "Diogo",
//     titulo: "T.I",
//     descripton: "Calvo da sul",
//     price: 100,
//     image: "nada",
//     code: "abc123",
//     stock: 50,
//     category: "a",
//     status: true
// }




router.get('/', async (req, res) => {
    let listProd
    try {
        listProd = await productosModel.findOne({});
        console.log(listProd)
        res.setHeader('Content-Type', 'application/json')
        console.log(listProd.length) 
        return res.status(200).render('home',{
            listProd,
            title:'Home Page'
        })
    } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ message: "Server Error!!" })

    }
})

router.get('/realtimeproducts', async(req,res)=>{

    res.status(200).render('realTimeProducts', {title:'Real Time Page'})

})

// router.post('/realtimeproducts', async (req, res) => {
//     const { title, description, price, code, stock, category, status } = req.body;

//     try {

//         const thumbnails = req.body.thumbnails || [];
//         const requiredFields = ['title', 'description', 'price', 'code', 'stock', 'category'];
//         const missingFields = requiredFields.filter(field => !(field in req.body));

//         if (missingFields.length > 0) {
//             return res.status(400).json({ error: `Faltan campos requeridos: ${missingFields.join(', ')}` });
//         }

//         const typeValidation = {
//             title: 'string',
//             description: 'string',
//             price: 'number',
//             code: 'string',
//             stock: 'number',
//             category: 'string',
//             status: 'boolean'
//         };

//         const invalidFields = Object.entries(typeValidation).reduce((acc, [field, type]) => {
//             if (req.body[field] !== undefined) {
//                 if (type === 'array' && !Array.isArray(req.body[field])) {
//                     acc.push(field);
//                 } else if (typeof req.body[field] !== type) {
//                     acc.push(field);
//                 }
//             }
//             return acc;
//         }, []);

//         if (!Array.isArray(thumbnails)) {
//             return res.status(400).json({ error: 'Formato inválido para el campo thumbnails' });
//         }

//         if (invalidFields.length > 0) {
//             return res.status(400).json({ error: `Tipos de datos inválidos en los campos: ${invalidFields.join(', ')}` });
//         }

//         const productData = {
//             title,
//             description,
//             price,
//             thumbnails,
//             code,
//             stock,
//             category,
//             status: status !== undefined ? status : true
//         };

//         let newProd = await productosModel.create(productData)

//         const responseCodes = {
//             "Ya existe un producto con ese código. No se agregó nada.": 400,
//             "Producto agregado correctamente.": 201,
//             "Error agregando producto.": 500,
//         };

//         //io.emit("producto", result)

//         const reStatus = responseCodes[newProd] || 500;
//         return res.status(reStatus).json({ message: "Prod created succesfull", newProd });



//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// });



//     try {
//         let result = await productManager.getProducts();
//         res.setHeader('Content-type', 'application/json')
//         res.status(200).render('realTimeProducts', {result, titulo: 'Home Page'})        
//     } catch (error) {
//         res.setHeader('Content-type', 'application/json')
//         return res.status(400).json({message:"Server Error!!"})

//     }
// })

module.exports = router;