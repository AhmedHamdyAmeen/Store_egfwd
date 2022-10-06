import bcrypt from "bcrypt";

import { BCRYPT_PASSWORD, BCRYPT_SALT } from "../../config";

/** Hash a Plaintext Password
 */
const hashPassword = (password: string): string => {
  try {
    const salt = parseInt(BCRYPT_SALT as string, 10);
    return bcrypt.hashSync(`${password}${BCRYPT_PASSWORD}`, salt);
  } catch (error) {
    throw new Error(`Couldn't hash password: ${(error as Error).message}`);
  }
};

/** Compar plaintext password with hashed password
 */
const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
): boolean => {
  try {
    const isMatched = bcrypt.compareSync(
      `${plainTextPassword}${BCRYPT_PASSWORD}`,
      hashedPassword
    );
    return isMatched;
  } catch (error) {
    throw new Error(
      `Couldn't Compare the passwords, ${(error as Error).message}`
    );
  }
};

export { hashPassword, comparePasswords };

/***
 *
 *  jwt.sign() ==> create token create token create token
 *    jwt.verify() ==> check the token..
 *
 *
 *
 */


