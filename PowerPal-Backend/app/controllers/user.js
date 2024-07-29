const {
  login,
  updateUserPw,
  createUser,
  findUserById,
  followUser,
  updateUser,
  searchUsersByUsername,
} = require("../services/user");

module.exports = {
  signup: async (req, res) => {
    try {
      const { username, email, password, name } = req.body;
      const LCemail = email.toLowerCase();
      const LCusername = username.toLowerCase();
      const newUser = await createUser({
        username: LCusername,
        email: LCemail,
        password,
        name,
      });
      console.log(newUser);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const LCemail = email.toLowerCase();
      const user = await login(LCemail, password);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUserPw: async (req, res) => {
    try {
      const { userId, oldPw, newPw } = req.body;
      const user = await updateUserPw(userId, oldPw, newPw);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  userById: async (req, res) => {
    try {
      const user = await findUserById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  followUser: async (req, res) => {
    try {
      const { userId, followId } = req.body;
      const user = await followUser(userId, followId);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, bio, achievements } = req.body;
      const user = await updateUser(userId, name, bio, achievements);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  searchUsersByUsername:async(req,res)=>{
    try{
      const username=req.params.username;
      const users=await searchUsersByUsername(username);
      res.json(users);
    }catch(err){
      res.status(500).json(err);
    }
    }
    
  
};
