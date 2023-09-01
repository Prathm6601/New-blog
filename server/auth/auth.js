const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("========",req.body.username);
    const user = await User.findOne({ username: req.body.username });
    console.log(">>>>>>>>>>>>>",user);
    if (!user)
       return res.status(401).send({ message: "Invalid Email or Password..." });
   const validPassword = await bcrypt.compare(
       req.body.password,
       user.password
     );
     console.log("----------",validPassword);
     if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

    const { password, ...others } = user._doc;
    return res.status(200).json(others);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
