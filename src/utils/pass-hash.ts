import bcrypt from "bcrypt";

export class PasswordService {
  constructor() {}
  /**
   *
   * @param value password value
   * @returns hashed password
   */
  static async encrypt(value: string): Promise<string> {
    const saltRounds = 12;
    const hash = await bcrypt.hash(value, saltRounds);
    return hash;
  }
  /**
   *
   * @param password password passed as a parameter
   * @param savedPass saved password on the database
   * @returns boolean
   */
  static async compare(password: string, savedPass: string): Promise<boolean> {
    const comparePass = await bcrypt.compare(password, savedPass);
    return comparePass;
  }
}
