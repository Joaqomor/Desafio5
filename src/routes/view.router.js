import { Router } from "express";
import ProductManager from "../service/mongoManagers/productManager.js";


const productManager = new ProductManager();
const router = Router();

router.get('/products',  async (req, res) => {
    const allProducts = await productManager.getProducts()
    res.render('home', {allProducts})
});

router.get('/session', (req, res)=>{
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado este sitio ${req.session.counter} veces` )
    }else{
        req.session.counter = 1; 
        res.send("Bienvenido!!")
    } 
})

router.get('/login', (req, res)=>{
    const {username, password} = req.query;

    if(username !== 'pepe' || password !== 'pepepass'){
        return res.status(401).send("Login failed") 
    }else{
        req.session.user = username;
        req.session.admin = false;
        res.send("Login Successful!!")
    }
})



export default router;