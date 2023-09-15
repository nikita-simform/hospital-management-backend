const express = require("express");
const api=require('./routes/api');
const cors=require('cors');
const path=require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors({
    origin: '*'
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json()); //which will parse any incoming JSON from the body of any incoming request
// app.use(express.static(path.join(__dirname,'..','dist')))

app.use('/v1',api);
// app.get('/*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'..','dist','index.html'));
// });
module.exports = app;
                