import bcrypt from "bcryptjs"

export const generateSalt = async () => {

  return await bcrypt.genSalt(10)

}

export const generatePassword = async (password, salt) => {

  return await bcrypt.hash(password, salt)

}

export const validatePassword = (password, hash) => {

  return bcrypt.compareSync(password, hash)

}