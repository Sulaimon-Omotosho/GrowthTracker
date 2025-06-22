// import bcrypt from 'bcrypt'

export async function saltAndHashPassword(password: string): Promise<string> {
  const bcrypt = require('bcrypt')
  const saltRounds = 15
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}
