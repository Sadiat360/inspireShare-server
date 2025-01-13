import initKnex from 'knex';
import configuration from '../knexfile.js'

const knex = initKnex(configuration);

const server = async (req, res) => {
    try{
        console.log('welcome to user streak')
        const streaks = await knex('user_streaks')
        .select('*')
        res.status(200).json(streaks);
    }catch(error){
        res.status(400).send(`Error fetching Streaks: ${error}`);
    }
};

const findUserStreak = async (req, res) => {
       const userId = req.params.userId;

       try{

        const foundStreak = await knex('user_streaks')
        .select('streak_count', 'last_interaction')
        .where('user_id', userId)
        .first();
        if (!foundStreak){
            return res.status(404).json({streak_count: 0, last_interaction: null })
        }
        res.status(200).json(foundStreak);
       }catch (error){
          res.status(500).json({error: error.message})
       }
}

const updateUserStreak = async (req, res) => {
    const userId = req.user_id;
    const { streakCount, lastInteraction } = req.body;
  
    try {
      const streak = await knex('user_streaks').where({ user_id: userId }).first();
  
      if (streak) {
        // Update existing streak
        await knex('user_streaks')
          .where({ user_id: userId })
          .update({ streak_count: streakCount, last_interaction: lastInteraction });
  
        res.json({ message: 'Streak updated successfully', streakCount, lastInteraction });
      } else {
        // Insert new streak for the user
        await knex('user_streaks').insert({ user_id: userId, streak_count: streakCount, last_interaction: lastInteraction });
  
        res.status(201).json({ message: 'Streak created successfully', streakCount, lastInteraction });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating streak', details: error.message });
    }
  };


export{
    server,
    findUserStreak,
    updateUserStreak
}