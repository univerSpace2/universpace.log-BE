export default (): any => ({
  env: process.env.UV_ENV,
  port: process.env.UV_PORT,
  host: process.env.UV_HOST,
});
