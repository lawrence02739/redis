const redisClient = require('../config/redis');
const User = require('../models/user.model')

async function createUser(req, res) {
    try {
        console.log("kkk");
        const user = new User(req.body);
        const data = await user.save();
        redisClient.set(`user:${data._id}`, JSON.stringify(data));

        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function getUsers(req, res) {
    try {
        redisClient.get('user', async (err, data) => {
            if (err) {
                return res.status(500).json({ err });
            }else if (data && JSON.parse(data).length > 0) {  
                console.log("poi",JSON.parse(data).length);  
                return res.status(200).json(JSON.parse(data));
            } else {
                console.log("khjgvh");
                const users = await User.find();
                redisClient.setex('user', 3600, JSON.stringify(users));
                return res.status(200).json(users);
            }
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findOne({_id:req.params.id});
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        await User.deleteOne({_id:req.params.id});
        await redisClient.del('user'); // Remove from cache
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Error deleting users' });
    }
}


module.exports = {
    createUser,
    getUsers,
    deleteUser
};
