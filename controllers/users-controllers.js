import initKnex from 'knex';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


import knexConfig from '../knexfile.js';

const knex = initKnex(knexConfig);
const SALT_ROUNDS = 8;
const jwtSecret = process.env.JWT_SECRET;

////// old token-----3cb49d1f6c1a887df4a36c93535106b3eee8bb70c7e63fc04ff4f8
// 984ba41d6154bb1717c8f6c1f6e1bf9bfdd93a8354ba01a640b836
// 3b9074239b960aa7b041

const server = async (req, res) => {
    try{
        console.log('welcome to users')
        const streaks = await knex('users')
        .select('*')
        res.status(200).json(streaks);
    }catch(error){
        res.status(400).send(`Error fetching Users: ${error}`);
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Request body:', req.body);
    console.log('Validation result:', !req.body.name || !req.body.email || !req.body.password);
    if(!name || !email || !password){
      return res 
        .status(400)
        .json({message: 'You must provide a name, email and password'})
    }
   
  
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUserIds = await knex('users').insert(
        { name,
          email,
          password: hashedPassword, },
       ['id']
      );
     
  
      const newUser = await knex('users').where({id: newUserIds[0]}).first();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: `Error registering user,${error.message} ` });
    }
   

  };

  /// log in user

  const loginUser = async ( req, res) => {
    const {  email, password } = req.body;
    if(!email || !password){
      return res 
        .status(400)
        .json({message: 'You must provide a name, email and password'})
    }


    try{
        const user = await knex('users')
        .where({email}) //// probably change to just email
        .first();
        
        if(!user){
            return res.status(400).json({error: 'User not found'});

        }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    console.log('JWT_SECRET:', jwtSecret);
       ///generate JWT token
    const token = jwt.sign({ 
      id: user.id }, 
      jwtSecret, 
      { expiresIn: '8h' });

    res.status(200).json({ message: 'Login successful', token,
      user:{id: user.id, name:user.name, email: user.email }
     });
    }catch (error) {
       console.error('JWT Sign Error:', error);
        res.status(500).json({ message: `Error logging in, ${error.message}` });
      }
     

    
  };

    
  const getProfile =  async (req, res) => {
    try{
       const user = await knex ('users').where({id: req.token.id}).first();
       console.log('user:', user)
       res.json(user);
    }catch (error){
       res.status(500).json({message: "Can't fetch user profile"});
    }
  }
  export {
    registerUser,
    loginUser,
    getProfile,
    server
  }
