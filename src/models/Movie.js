const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('movie', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creationdate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.DATE
        },
        calification: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validator:{max: 5}
        }
    
})
}