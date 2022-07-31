const {Character,Movie, Op} = require("../db");

const getCharacters = async (req, res) => {
    const query = req.query;
    console.log(query)
    let condition;
    if(query.hasOwnProperty('name')){ 
        condition = {where: {name:{
            [Op.startsWith]: `${query.name}`
        }}}
    
    }else if(query.hasOwnProperty('age')){
        condition = {where: {age: query.age}}
    }else if(query.hasOwnProperty('idMovie')){
        condition = { 
            include:{
                model: Movie, 
                where:{id: query.idMovie}}, 
                through: {attributes: ["id", "title", "creationdate"]}
            }
    }else{
        condition = {}
        
    }
    
    try {
        const characters = await Character.findAll(condition)
        console.log(characters)

        characters.length > 0
            ? res.json({message: "character/s encotrado/s", characters})
            : res.json({message: "character/s no encotrado/s", characters})
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const createCharacter = async (req, res) => {
    const { id,name,age,weight, image,history,movies} = req.body;
    try {
        const character = await Character.create({id,name,age,weight,image,history});

        const allMovies = await Movie.findAll({
            where: {id: movies}
        })

        await character.addMovies(allMovies)
        res.json({
            message: "character created",
            date: character
        })
    } catch (error) {
        res.send(error)
    }
}

const editCharacter = async (req, res) => {
    const {id, name, age, weight, image, history} = req.body;

    try {
        const resEdit = await Character.update({name, age, weight, image, history},{where: {id: id}})
        
        res.json({message: "character update",
                    resEdit
                    })
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteCharacter = async (req, res) => {
    const {id} = req.params;
    try {
        await Character.destroy({where: id})
    } catch (error) {
        res.send(error)
    }
}

const detailsCharacter = async (req, res) => {
    try {
        const character = await Character.findAll({
            where: {id: req.params.id},
            include: Movie
        })
        res.send(character);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
}



module.exports = {
    getCharacters,
    createCharacter,
    editCharacter,
    deleteCharacter,
    detailsCharacter,
}