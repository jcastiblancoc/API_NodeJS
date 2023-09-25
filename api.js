const dbcategoria = require('./dbcategoria');
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.route('/categoria').get(async (request, response) => {
    try {
        const categorias = await dbcategoria.getCategoria();
        response.json(categorias);
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


router.route('/categoria/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const categorias = await dbcategoria.getCategoriaId(id);
        response.json(categorias);
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


router.route('/addcategoria').post(async (request, response) => {
    try {
        const { nombre, descripcion, estado } = request.body;
        const result = await dbcategoria.addCategoria(nombre, descripcion, estado);
        response.json({ id: result.insertId, message: 'Category inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.route('/updatecategoria/:id').put(async (request, response) => {
    try {
        const id = request.params.id;
        const updateParams = request.body;
        const result = await dbcategoria.updateCategoria(id, updateParams);
        response.json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Conexion a API exitosa escuchando en el puerto: ' + port);