//bcrypt saltOrRounds
export const BCRYPT_ROUNDS = process.env.BCRYPR_ROUNDS ? parseInt(process.env.BCRYPR_ROUNDS) : 4;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = '30d';