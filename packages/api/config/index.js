const config = {
  port: process.env.PORT || 3000,
  secret: 'super secret passphrase',
  database: 'mongodb://localhost:27017/test',
  populate: true,
};

export default config;
