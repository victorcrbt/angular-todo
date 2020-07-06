interface IAuthOptions {
  jwt_secret: string;
}

export default {
  jwt_secret: process.env.JWT_SECRET,
} as IAuthOptions;
