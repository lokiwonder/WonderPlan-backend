// todo: config 혹은 시스템 환경 변수로 변경 //
export const AZURE_SERVER_IP = '20.196.129.128';
export const AZURE_SERVER_NEST_PORT = '4000';
export const AZURE_SERVER_DB_PORT = '4717';
export const MONGODB_URL = `mongodb://${AZURE_SERVER_IP}:${AZURE_SERVER_DB_PORT}/wonderPlan`;
export const JWT_SECRET = 'wonderPlanJwtSecretKey';
export const JWT_SIGN_EXPIRY_IN = 60 * 60 * 24;
export const JWT_SIGN_OPTOINS = { expiresIn: JWT_SIGN_EXPIRY_IN };
export const PASSPORT_DEFAULT_STRATEGY = 'jwt';
export const PASSPORT_STRATEGY = { defaultStrategy: PASSPORT_DEFAULT_STRATEGY };
