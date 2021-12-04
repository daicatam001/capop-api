module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9b561948314a76de6e9db513dcb939ab'),
  },
});
