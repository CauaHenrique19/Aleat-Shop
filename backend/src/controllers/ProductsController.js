const knex = require('../database/connection')
const fs = require('fs')
const crypto = require('crypto')

const aws = require('aws-sdk')
const s3 = new aws.S3()

class Products {
    async create(req, res) {
        try {
            const { name, price, description, category_id } = req.body

            const product = {
                name,
                price,
                description,
                category_id
            }

            if (!product.name) return res.json({ error: true, message: 'Nome não informado!' })
            if (!product.price) return res.json({ error: true, message: 'Preço não informado!' })
            if (!product.description) return res.json({ error: true, message: 'Descrição não informada!' })
            if (!product.category_id) return res.json({ error: true, message: 'Categoria não informada!' })

            const filesArray = Object.entries(req.files)

            const returnsUploads = await Promise.all(filesArray.map(async (file) => {
                file.shift()

                const randomBytes = crypto.randomBytes(16).toString('hex')
                const fileStream = fs.createReadStream(file[0].path)
                const fileName = file[0].name
                const mimetype = file[0].type

                const params = {
                    Bucket: process.env.BUCKET,
                    Key: `${randomBytes}-${fileName}`,
                    Body: fileStream,
                    ContentType: mimetype,
                    ACL: 'public-read'
                }

                const { Key, Location } = await s3.upload(params).promise()
                return { Key, Location }
            }))

            product.key_image = returnsUploads[0].Key
            product.image_url = returnsUploads[0].Location

            const productDb = await knex('products')
                .insert(product, '*')

            //io.emit('quantidade-produtos', { quantProdutos })
            return res.json(productDb)
        }
        catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao cadastrar um produto!', error: error.message })
        }
    }
    async index(req, res) {
        try {
            const page = req.query.page || 1
            const size = req.query.size || 20
            const offset = size * (page - 1)

            const products = await knex('products')
                .select('products.id', 'products.name', 'products.price',
                    'products.description', 'products.key_image', 'products.image_url',
                    'products.category_id', 'categories.name as category_name', 'categories.color as category_color',
                    'categories.icon as category_icon')
                .join('categories', 'categories.id', 'products.category_id')
                .orderBy('products.id')
                .limit(size)
                .offset(offset)

            const [quantityProducts] = await knex('products')
                .count('id')

            const pagination = {
                result: products,
                actualPage: parseInt(page),
                size: parseInt(size),
                quantityProducts: parseInt(quantityProducts.count),
                totalPages: Math.ceil(quantityProducts.count / size),
                items: products.length
            }

            res.json(pagination)
        }
        catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao buscar produtos!', error: error.message })
        }
    }
    async show(req, res) {
        try {
            const id = req.params.id

            const product = await knex('products')
                .select('products.id', 'products.name', 'products.price',
                    'products.description', 'products.key_image', 'products.image_url',
                    'products.category_id', 'categories.name as category_name', 'categories.color as category_color',
                    'categories.icon as category_icon')
                .join('categories', 'categories.id', 'products.category_id')
                .where('products.id', id)
                .orderBy('products.id')

            res.json(product)
        }
        catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao buscar produto específico!', error: error.message })
        }
    }
    async byCategories(req, res) {
        try{
            const category_id = req.params.categoryId
    
            const products = await knex('products')
                .select('products.id', 'products.name', 'products.price',
                    'products.description', 'products.key_image', 'products.image_url',
                    'products.category_id', 'categories.name as category_name', 'categories.color as category_color',
                    'categories.icon as category_icon')
                .join('categories', 'categories.id', 'products.category_id')
                .where('products.category_id', category_id)
                .orderBy('products.id')
    
            return res.json(products)
        }
        catch(error){
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao buscar produtos por categoria!', error: error.message })
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id
            const { name, price, description, category_id, key_image, image_url } = req.body

            const product = {
                name,
                price,
                description,
                category_id,
                key_image,
                image_url
            }

            if (!product.name) return res.json({ error: true, message: 'Nome não informado!' })
            if (!product.price) return res.json({ error: true, message: 'Preço não informado!' })
            if (!product.description) return res.json({ error: true, message: 'Descrição não informada!' })
            if (!product.category_id) return res.json({ error: true, message: 'Imagem não informada!' })
            if (!product.key_image) return res.json({ error: true, message: 'Imagem não informada!' })
            if (!product.image_url) return res.json({ error: true, message: 'Imagem não informada!' })

            if (req.files) {

                const filesArray = Object.entries(req.files)

                filesArray.map(async (file) => {
                    file.shift()

                    const filepath = file[0].path
                    const mimetype = file[0].type
                    const fileStream = fs.createReadStream(filepath);

                    const result = s3.putObject({
                        Bucket: process.env.BUCKET,
                        Key: product.key_image,
                        Body: fileStream,
                        ContentType: mimetype,
                        ACL: 'public-read'
                    }).promise()

                })
            }

            const updatedProduct = await knex('products')
                .update(product, '*')
                .where({ id })

            return res.json(updatedProduct)
        }
        catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao atualizar produto!', error: error.message })
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id

            const { key_image } = await knex('products')
                .select('key_image')
                .where({ id })
                .first()

            s3.deleteObject({ Bucket: process.env.BUCKET, Key: key_image })
                .promise()

            knex('products')
                .delete()
                .where({ id })
                .then(_ => res.json({ message: 'Produto excluído com sucesso!' }))
                .catch(error => res.status(500).json({ message: 'Ocorreu um erro inesperado ao excluir produto!', error: error.message }))
        }
        catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao excluir produto!', error: error.message })
        }

        //io.emit('quantidade-produtos', { quantProdutos })
    }
}

module.exports = new Products()