import { JwtPayload, jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  username: string;
}

class AuthService {
  private static TOKEN_KEY = 'auth_token';

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch {
      return false;
    }
  }

  static getAuthHeader(): { Authorization: string } | Record<string, never> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  static getProfile(): User | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded = jwtDecode<JwtPayload & User>(token);
      return {
        id: decoded.id,
        username: decoded.username
      };
    } catch {
      return null;
    }
  }

  static login(token: string): void {
    this.setToken(token);
  }

  static logout(): void {
    this.removeToken();
  }
}

export default AuthService;
