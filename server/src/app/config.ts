export const Config = {
  mongoDB_URL: process.env.MONGODB_URI || "mongodb://localhost:27017/shop?retryWrites=true&w=majority",
  JWT_SECRET: "secret_jwt_key",
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb",
};
