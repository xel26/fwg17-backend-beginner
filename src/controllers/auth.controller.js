const userModel = require("../models/user.model");
const forgotModel = require("../models/ForgotPassword.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../moduls/handling");
const transport = require("../../mail.helper");
const db = require("../lib/db.lib");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error(`please enter your email`);
    }

    const user = await userModel.findOneByEmail(email);
    if (!user) {
      throw new Error(
        `email not registered. . . please sign up to create new account`
      );
    }

    if (!password) {
      throw new Error(`please enter your password`);
    }

    const verify = await argon.verify(user.password, password);
    if (!verify) {
      throw new Error(`wrong password. . . please try again`);
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.APP_SECRET || "secretKey");

    return res.json({
      success: true,
      message: `login success. . . embark your coffee journey`,
      results: {
        token: token,
      },
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName) {
      throw new Error(`Full Name cannot be empty`);
    }

    if (!email) {
      throw new Error(`email cannot be empty`);
    }

    const user = await userModel.findOneByEmail(email);
    if (user) {
      throw new Error(`email ${email} already registered. . . please login`);
    }

    if (!password) {
      throw new Error(`password cannot be empty`);
    }

    await userModel.insert({
      fullName,
      email,
      password,
      role: "customer",
    });

    return res.json({
      success: true,
      message: "register success. . . welcome aboard!",
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (email) {
      await db.query("BEGIN");

      const user = await userModel.findOneByEmail(email);
      if (user) {
        const { customAlphabet } = await import("nanoid");
        const rand = customAlphabet("1234567890", 6);
        const otp = rand();

        const request = await forgotModel.insert({
          otp,
          email: user.email,
          userId: user.id,
        });

        //nodemailer start
        const mailOptions = {
          from: process.env.GMAIL_EMAIL_ADDRESS,
          to: request.email,
          subject: `Ini adalah Kode OTP anda ${otp}`,
          html: `
            <div>
              <p>Masukan kode 6 digit di bawah ini untuk membuat password baru dan mendapatkan kembali akses ke akun anda</p>
              <p>${otp}</p>
              <p>Terima kasih telah membantu kami menjaga keamanan akun Anda.</p>
              <p>Tim Coffee Shop Digital App</p>
            </div>`,
        };

        const sendMail = async () => {
          try {
            const mailer = await transport();
            await mailer.sendMail(mailOptions);
            console.log("Email terkirim!");
          } catch (err) {
            await db.query("ROLLBACK");
            // console.log(err);
            console.log("Gagal!");
          }
        };

        sendMail();
        console.log(otp);

        await db.query("COMMIT");
        return res.json({
          success: true,
          message: `OTP has been sent to your email`,
        });
      }

      throw new Error(`email not registered. . . . please use another email`);
    } else {
      if (otp) {
        await db.query("BEGIN");

        const found = await forgotModel.findOnebyOtp(otp);
        if (!found) {
          throw new Error(
            "invalid OTP code. . . please enter the correct code"
          );
        }

        const user = await userModel.findOneByEmail(found.email);

        await userModel.update(user.id, { password: newPassword });

        // if(!update){
        //   throw new Error('create new password failed, try again!')
        // }

        await forgotModel.delete(found.id);

        await db.query("COMMIT");
        return res.json({
          success: true,
          message: `create new password for ${found.email} success`,
        });
      }
    }
  } catch (err) {
    await db.query("ROLLBACK");
    return errorHandler(err, res);
  }
};
