const knex = require('../database/connection')

class OrdersController{
    async index(req, res){
        try{
            const orders = await knex('orders')
                .select('*')
                
            return res.json(orders)
        }
        catch(error){
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao pegar pedidos!', error: error.message })
        }
    }
    async create(req, res){
        try{
            const { user_id, products } = req.body
    
            const productsDb = await knex('products')
                .select('id', 'name', 'price', 'description', 'image_url')
                .where((builder) => builder.whereIn('id', products.map(id => id.id)))
    
            const total = productsDb.reduce((accumulator, actual) => parseFloat(actual.price) + accumulator, 0)
        
            const order = {
                user_id,
                total,
                created_at: new Date().toISOString()
            }
    
            const [orderDb] = await knex('orders')
                .insert(order, '*')
    
            const productsInOrders = productsDb.map(product => ({ order_id: orderDb.id, product_id: product.id }))
    
            await knex('products_in_orders')
                .insert(productsInOrders)
    
            orderDb.products = productsDb
    
            return res.json(orderDb)
        }
        catch(error){
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao fazer pedido!', error: error.message })
        }
    }
    async delete(req, res){
        try{
            const { id } = req.params
    
            await knex('products_in_orders')
                .delete()
                .where({ order_id: id })
    
            await knex('orders')
                .delete()
                .where({ id })
    
            return res.json({ message: 'Pedido excluído com sucesso!' })
        }
        catch(error){
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao excluir pedido!', error: error.message })
        }
    }
}

module.exports = new OrdersController()