const express = require('express');
const jwt = require('jsonwebtoken');

const routerPrivate = express.Router();

routerPrivate.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
    jwt.verify(token, 'pepe', (err, decoded) => {      
        if (err) {
        return res.status(404).json({ mensaje: 'Token inválida', err });    
        } else {
            console.log('correctoo jwt')
            req._user = decoded;    
            next();
        }
    });
    } else {
        
        res.status(500).json({ 
            mensaje: 'Token no proveída.' 
        });
    }
 });

module.exports = routerPrivate;