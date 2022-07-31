const {Movie, Genre, Character, Op} = require("../db")


const getMovies = async (req, res) => {
    const query = req.query;
    console.log(query)
    let condition;
    if(query.hasOwnProperty("name")){
        condition = {where: {title:{
            [Op.startsWith]: `${query.name}`
        }}}
    }else if(query.hasOwnProperty("idGenre")){
        condition = {include:{model: Genre, where: {id: query.idGenre}}}
    }else if(query.hasOwnProperty("order")){
        const order = req.query.order;

        if(order === "ASC"){

        }else if(order ===  "DESC"){
            condition = {order: [['title', 'DESC']]}
        }
    }else {
        condition = {}
    }

    try {
        const resMovie = await Movie.findAll(condition)

        
        res.send(resMovie)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getDetailsMovie = async (req, res) => {
    try {
        const resMovie = await Movie.findAll({
            where: {id: req.params.id}, 
            include: [
                {model: Genre, attributes: ["id", "name" ], through:{attributes:[]}},
                {model: Character, attributes: ["id", "name", "age" ], through:{attributes:[]} }
            ]
            }
        )

        res.send(resMovie)
    } catch (error) {
        res.status(500).send(error)
    }
}



const createMovie = async (req, res) => {
    const {title,image,calification,creationdate,genres } = req.body;
    console.log("aqui")
    try {
        const resMovie = await Movie.create({title,image,creationdate, calification});

        const resGenres = await Genre.findAll({where: {name: genres}});

        await resMovie.addGenres(resGenres);

        res.send("pelicula creada")
    } catch (error) {
        res.status(500).send(error);
    }
}


const editMovie = async (req, res) => {
    const {...rest} = req.body;
    try {
        const putMovie = await Movie.update(rest,{ where: {id: req.params.id}});
        res.json({message: "pelicula actualizada", movie: putMovie})
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteMovie = async (req, res) => {
    try {
        const deletMov = await Movie.delete({where: {id: req.params.id}})

        res.send("pelicula eliminada")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getMovies,
    getDetailsMovie,
    createMovie,
    editMovie,
    deleteMovie
}
