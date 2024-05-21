import Joi from "joi"
import {
  generateSalt,
  generatePassword,
  validatePassword,
} from "../utils/password.util.js"
import User from "../models/User.model.js"
import jwt from "jsonwebtoken"

export const login = async (req, res, next) => {
  const validation = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }).validate(req.body)

  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message })
  }

  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user === null) {
      return res.status(404).json({ message: "user not found." })
    }

    const isPasswordCorrect = validatePassword(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "wrong credentials" })
    }
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    })

    return res.status(200).json({ token })
  } catch (error) {
    console.log("login error: ", error)
    return res.status(500).json({ error: error })
  }
}

export const signup = async (req, res, next) => {
  const validation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(req.body)

  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message })
  }

  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser !== null) {
      return res
        .status(400)
        .json({ message: "user with this email already exists." })
    }

    const salt = await generateSalt()
    const hashPassword = await generatePassword(password, salt)

    const user = await User.create({
      email,
      password: hashPassword,
    })

    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    })

    return res.status(200).json({ user, token, message: "signup successfull" })
  } catch (error) {
    console.log("signup error: ", error)
    return res.status(500).json({ error: error })
  }
}

export const updateUser = async (req, res, next) => {
  const user = req.user
  return res.status(200).json({ user })
}
