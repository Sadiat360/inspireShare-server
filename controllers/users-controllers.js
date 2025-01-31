import initKnex from 'knex';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



import knexConfig from '../knexfile.js';

const knex = initKnex(knexConfig);
const SALT_ROUNDS = 8;
const jwtSecret = process.env.JWT_SECRET;
// const NODE_ENV = process.env.NODE_ENV;

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

  ////// log in user

  const loginUser = async ( req, res) => {
    const {  email, password } = req.body;
    if(!email || !password){
      return res 
        .status(400)
        .json({message: 'You must provide a name, email and password'})
    }


    try{
        const user = await knex('users')
        .where({email}) 
        .first();
        
        if(!user){
            return res.status(400).json({error: 'User not found'});

        }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    
    const token = jwt.sign({ 
      id: user.id }, 
      jwtSecret, 
      { expiresIn: '8h' });

      //// setting HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, /////true for deploy
        sameSite: 'lax', ///'None' for production
        maxAge: 3600000,
      })
     

    res.status(200).json({ message: 'Login successful', token,
      user:{id: user.id, name:user.name, email: user.email }
     });
    }catch (error) {
       console.error('JWT Sign Error:', error);
        res.status(500).json({ message: `Error logging in, ${error.message}` });
      }
     

    
  };

  ///// user log out

  const logOutUser = async (req, res) => {
           try{
            console.log("Token in request cookies:", req.cookies.token);
            res.clearCookie('token',{
              httpOnly: true,
              secure: false,
              sameSite: 'lax'
            });
            if (!req.cookies.token) {
              return res.status(401).json({ message: 'No token found, unauthorized' });
            }
            res.json({message: 'Logged out successfully'});
           }catch( error){
            console.error('Logout Error:', error)
                res.status(500).json({message: "Unable to log user out"});
           }
    
  }

  ////// get user profile
  const getProfile =  async (req, res) => {
    
     const token = req.cookies.token;
     console.log('Token from Cookies:', token); 
   
     if(!token){
      return res.status(401).json({message: 'Unauthorized. No token provided'})
     }
    try{
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       console.log('Decoded token:', decodedToken)
       const user = await knex ('users').where({id: decodedToken.id}).first();
       console.log('user:', user)
       res.json(user);
    }catch (error){
       res.status(500).json({message: "Can't fetch user profile"});
    }
  }


  
  export {
    registerUser,
    loginUser,
    logOutUser,
    getProfile,
    server
  }
