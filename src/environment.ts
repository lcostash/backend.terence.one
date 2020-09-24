export const environment = {
  app: {
    port: 3000,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
  },
  jwt: {
    secret: 'c7bc5c94b02e757a60546f5e7bc144ea',
    expiresIn: '3600s',
  },
  cors: {
    origin: [/localhost:4200/],
  },
  file: {
    messages: 'messages.json',
  },
};
