import dotenv from 'dotenv';

dotenv.config();
const SERVER_PORT = process.env.PORT || 3000;
const DB_URL = (process.env.NODE_ENV == 'test' ? process.env.DB_URL_TEST : process.env.DB_URL) || 'mongodb://localhost:27017/imagerepository';
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || 'http://localhost:4000/api/email/send';
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || 'AKIA2JHSJTWRGFLPXKGM';
const S3_ACCESS_SECRET = process.env.S3_ACCESS_SECRET || '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';
const BUCKET_NAME = process.env.BUCKET_NAME || 'revie';
const DEFUALT_REGION = process.env.REGION || 'us-east-2';
const CLOUD_NAME = process.env.CLOUD_NAME || '';
const CLOUD_KEY = process.env.CLOUD_KEY || '';
const CLOUD_SECRET = process.env.CLOUD_SECRET || '';

const SERVER = {
    port: SERVER_PORT,
    dbUrl: DB_URL,
    hostname: SERVER_HOSTNAME,
    emailServiceUrl: EMAIL_SERVICE_URL,
    s3AccessKey: S3_ACCESS_KEY,
    s3AccessSecret: S3_ACCESS_SECRET,
    bucketName: BUCKET_NAME,
    defaultRegion: DEFUALT_REGION,
    cloud_name: CLOUD_NAME,
    cloud_key: CLOUD_KEY,
    cloud_secret: CLOUD_SECRET
};

const config = {
    server: SERVER
};

export default config;
