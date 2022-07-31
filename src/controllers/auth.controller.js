const {User} = require("../db")

const LoginUser = () => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({
            where: {email: email}
        });
        if(!user){
            res.status(404).json({msg: 'Usuario no encontrado'})
        }else{
            if(bcrypt.compareSync(password, user.password)){

                let token = jwt.sign({user: user}, 'pepe', {
                    expiresIn: "24h"
                });
                res.json({
                    token: token,
                    type: user
                })
            }else{
                res.status(401).json({msg: "Contraseña incorrecta"})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


const RegisterUser = async (req, res) => {
    const body = req.body;
    let password = bcrypt.hashSync(body.password, Number.parseInt(10))
    try {
        const user = await   User.create({
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: password,
            type: body.type
        });
        
        let token = jwt.sign({user: user}, 'pepe', {
            expiresIn: "24h"
        });
       // res.cookie('useToken', user[0].id)
        res.josn({message:"create",  user, token})
    } catch (error) {
        res.status(500).json({message: "error", error});
    }
}

module.exports = {
    LoginUser,
    RegisterUser
}