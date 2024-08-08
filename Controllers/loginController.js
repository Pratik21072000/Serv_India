const RegisterUser = require("../Model/RegisterUser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { accountType, username, password, email } = req.body;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await RegisterUser.create({
      accountType: accountType,
      userName: username,
      userEmail: email,
      userPassword: hashPassword,
    });
    res
      .status(201)
      .json({ message: `${accountType} registered successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { userpassword, useremail } = req.body;
  try {
    const user = await RegisterUser.findOne({
      where: {
        userEmail: useremail,
      },
    });
    const isPasswordValid = await bcrypt.compare(
      userpassword,
      user.userPassword
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // OaATmndZW8vHOI
    const token = jwt.sign(
      {
        id: user.id,
        userEmail: user.userEmail,
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "User logged in successfully!",
      accountType: user.accountType,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token!" });
    }
    req.decoded = decoded;
    next();
  });
};
