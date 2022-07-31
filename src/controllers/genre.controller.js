const {Genre} = require("../db")

const createGenre = async (req, res) => {
    const genres = req.body;
    console.log(genres)

    try {
        const resGenres = Genre.bulkCreate(genres);
        res.send('Generos creados correctamente');
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    createGenre
}