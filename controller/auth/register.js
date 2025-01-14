const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");
require("dotenv").config();
const { User } = require("../../schema/users");
const { requestError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = nanoid();
  const { BASE_URL } = process.env;

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  const mail = {
    to: "redrot7@gmail.com",
    subject: "Please, confirm you email",
    html: `<a target="_blank" href=${BASE_URL}/api/users/verify${verificationToken}">Confirm</>`,
  };
  sendEmail.sgMail.send(mail);

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = register;
