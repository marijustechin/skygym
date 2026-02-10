export default class AuthService {
  static async login(email: string, password: string): Promise<string> {
    return `Email: ${email} Password: ${password}`;
  }
}
