import { Router } from "express";
import {cartModel} from '../models/carts.models.js';
import { prodModel } from "../models/product.models.js";

const cartRouter = Router();

cartRouter.get('/:id', async(req, res) =>{
    const {id} = req.params
    try{
        const carts = await cartModel.findById(id)
        if(carts){
            res.status(200).send({resputa: "OK" , mensaje: carts})
        }else{
            res.status(404).send({respuesta: "Error en consultar carrrito", mensaje: "carts not found"})
        }
        
    }catch(error){
        res.status(400).send({respuesta: "Error", mensaje: error})
    }
})

cartRouter.post('/', async(req, res) =>{
    try{
        const carts = await cartModel.create({})
        res.status(200).send({respuesta: "OK" ,mensaje: carts})
    }catch(error){
        res.status(400).send({respuesta: "Error", mensaje: "No se logro crear carrito"})
    }
})

cartRouter.post('/:cid/products/:pid', async(req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    try{
        const cart = await cartModel.findById(cid)
        if(cart){
            const prod = await prodModel.findById(pid)
            if(prod){
                const indice = cart.products.products.findIndex(prod => prod.id_prod == pid)
                if(indice != -1){
                    cart.products.products[indice].quantity += quantity
                }else{
                    cart.products.products.push({id_prod: pid, quantity: quantity})
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({respuesta: "OK" , mensaje: respuesta})
            }else{
                res.status(404).send({respuesta: "Error al buscar Producto" ,mensaje: "Product not Found"})
            }
        }else{
            res.status(404).send({respuesta: "Error al buscar carrito" ,mensaje: "Carrito not Found"})
        }
    }catch(error){
        console.log(error)
        res.status(400).send({respuesta: "Error", mensaje: "No se logro crear carrito"})
    }
})


export default cartRouter;

