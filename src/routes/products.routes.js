import { Router } from "express";
import { prodModel}  from '../models/product.models.js'

const productRouter = Router()

productRouter.get('/', async(req, res) =>{
    const {limit} = req.query

    try{
        const prods = await prodModel.find().limit(limit)
        res.status(200).send({respuesta: "OK" ,mensaje: prods})
    }catch(error){
        res.status(400).send({respuesta: "Error en consultar productos", mensaje: error })
    }
}) 

productRouter.get('/:id', async(req, res) =>{
    const {id} = req.params

    try{
        const prods = await prodModel.findById(id)
        if(prods){
            res.status(200).send({respuesta: "OK" ,mensaje: prods})
        }else{
            res.status(404).send({respuesta: "Error en consultar producto", mensaje: "not found"})
        }
        
    }catch(error){
        res.status(400).send({respuesta: "Error en consultar productos", mensaje: error })
    }
})

productRouter.post('/', async(req, res) =>{
    const {title, description, code, stock, price, category} = req.body

    try{
        const prods = await prodModel.create({title, description, price, stock, code, category})
        res.status(200).send({respuesta: "OK" ,mensaje: prods})
    }catch(error){
        res.status(400).send({respuesta: "Error", mensaje: "No se logro crear producto"})
    }
})

productRouter.put('/:id', async(req, res) =>{
    const {id} = req.params
    const {title, description, code, stock, price, category, status} = req.body

    try{
        const prods = await prodModel.findByIdAndUpdate(id, {title, description, code, price, status, category, stock})
        if(prods){
            res.status(200).send({respuesta: "OK" ,mensaje: "Producto actualizado"})
        }else{
            res.status(404).send({respuesta: "Error en modificar", mensaje: "not found"})
        }
        
    }catch(error){
        res.status(400).send({respuesta: "Error en consultar productos", mensaje: error })
    }
})

productRouter.delete('/:id', async(req, res) =>{
    const {id} = req.params

    try{
        const prods = await prodModel.findByIdAndDelate(id)
        if(prods){
            res.status(200).send({respuesta: "OK" ,mensaje: "producto eliminado"})
        }else{
            res.status(404).send({respuesta: "Error en consultar producto", mensaje: "not found"})
        }
        
    }catch(error){
        res.status(400).send({respuesta: "Error en consultar productos", mensaje: error })
    }
})

export default productRouter;