const db = require("../models/db.model");
const User = db.user;
const nodemailer = require("nodemailer");
const Op = db.Sequelize.Op;
const { issueJWT } = require("../config/jwt");

async function mail(req, code) {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "emsdemo04@gmail.com", //email from which you want to send varification code
      pass: "Emaster@123456#", //password of above email
    },
  });

  let mailDetails = {
    from: "emsdemo04@gmail.com", //email from which you want to send varification code
    to: req.body.email,
    subject: "Test mail",
    text: `Account varification code $(code)`,
  };

  transport.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
}

//-------------------- addUser --------------------
module.exports.addUser = async (req, res) => {
  var code = Math.floor(Math.random() * 10000) + 1;

  try {
    let { name, email, password } = req.body;
    let user = {
      name: name,
      email: email,
      password: password,
      code: code,
    };
    console.log(user);
    let sendmail = await mail(req, code);
    // let usertbl = await User.sync(user)
    let userCreate = await User.create(user);

    res.status(200).json({
      success: true,
      message: "user add successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

module.exports.varify = async (req, res) => {
  try {
    let { email, code } = req.body;
    let user = {
      email: email,
      code: code,
    };
    let userVarify = await User.findAll({
      where: { [Op.and]: [{ email: email }, { code: code }] },
    });

    if (userVarify.length > 0) {
      let userUpdate = await User.update(
        { isActive: "1" },
        {
          where: { [Op.and]: [{ email: email }, { code: code }] },
        }
      );
      res.status(200).json({
        success: true,
        message: "User data varified successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User id not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

//-------------------- logIn --------------------
module.exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let userCreate = await User.findAll({
      where: { [Op.and]: [{ email: email }, { password: password }] },
    });
    if (userCreate.length > 0) {
      let token = await issueJWT(userCreate[0].dataValues);
      res.status(200).json({
        success: true,
        message: "user login successfully",
        token: token,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user not match",
        token: token,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.TypeError,
    });
  }
};

//-------------------- editUser --------------------
module.exports.editUser = async (req, res) => {
  try {
    let { id } = req.body;
    let userfindOne = await User.findAll({ where: { id: id } });
    if (userfindOne.length > 0) {
      let userUpdate = await User.update(req.body, {
        where: { id: id },
      });
      if (userUpdate[0] == 1) {
        res.status(200).json({
          success: true,
          message: "User data updated successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User id not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

//-------------------- deleteUser --------------------
module.exports.deleteUser = async (req, res) => {
  try {
    let { id } = req.body;
    let userfindOne = await User.findAll({ where: { id: id } });
    if (userfindOne.length > 0) {
      let userDelete = await User.destroy({ where: { id: id } });
      if (userDelete == 1) {
        res.status(200).json({
          success: true,
          message: "User data delete successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User id not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
