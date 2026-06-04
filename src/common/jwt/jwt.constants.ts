export const jwtConstants = {
  secretAuth: process.env.JWT_SECRET_AUTH ?? 'tienda-auth-secret',
  secretRefresh: process.env.JWT_SECRET_REFRESH ?? 'tienda-refresh-secret',
  authExpiresIn: 60 * 60,
  refreshExpiresIn: 60 * 60 * 24 * 7,
};
