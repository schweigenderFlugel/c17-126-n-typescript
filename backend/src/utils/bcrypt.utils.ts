import bcrypt from 'bcrypt'

/**
 * Creates a hash of the given password.
 *
 * @param {string} password - The password to be hashed.
 * @return {string} The hashed password.
 */
const createHash = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

/**
 * Check if the provided password matches the user's password.
 *
 * @param {string} userPassword - The user's password to compare against
 * @param {string} password - The password to compare
 * @return {boolean} True if the passwords match, false otherwise
 */
const isValidPassword = (userPassword: string, password: string): boolean => {
  return bcrypt.compareSync(password, userPassword)
}

export { createHash, isValidPassword }
