import { login } from './../types/login.type';
import argon2 from 'argon2';
import { User } from "../entities/user.entities";

export function asy cpasswordVerify() {
  const valid = await argon2.verify(typeof User, typeof login);
  if (!valid) {
    return {
      errors: [
        {
          field: "password",
          message: "incorrect password",
        },
      ],
    };
  }

}