import knex from 'knex';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import configuration from '../knexfile';

const knex = initKnex(configuration);

const JWT_SECRET = 'your_jwt_secret';/////how do i get my jwt secret token

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const [user] = await knex('users').insert(
        { name, email, password: hashedPassword },
        ['user_id', 'name']
      );
  
      // Generate JWT Token
      const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user', details: error.message });
    }
  };

  /// log in user

  const loginUser = async ( req, res) => {
    const { email, password} = req.body;

    try{
        const [user] = await knex('users')
        .WHERE({email})
        .SELECT('user_id', 'name', 'password');
        if(!user){
            return res.status(400).json({error: 'User not found'});

        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid password' });
    }
       ///generate JWT token
    const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
    }catch (error) {
        res.status(500).json({ error: 'Error logging in', details: error.message });
      }
    
  };

    
  // Middleware to verify JWT and extract user_id
  const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) return res.status(403).json({ error: 'Access denied' });
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: 'Invalid or expired token' });
      req.user_id = decoded.user_id;
      next();
    });
  };
