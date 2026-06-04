export interface JwtPayload {
  sub: number;
  usuario: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
  kind?: 'auth' | 'refresh';
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
