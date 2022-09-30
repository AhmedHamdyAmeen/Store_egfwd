import bcrypt from "bcrypt";

import { BCRYPT_PASSWORD, BCRYPT_SALT } from "../../config";

const hashPassword = (password: string): string => {
  try {
    const salt = parseInt(BCRYPT_SALT as string, 10);
    return bcrypt.hashSync(`${password}${BCRYPT_PASSWORD}`, salt);
  } catch (error) {
    throw new Error(`Couldn't hash password: ${(error as Error).message}`);
  }
};

export { hashPassword };
