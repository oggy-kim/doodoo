module.exports = {
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  kakaoClientKey: process.env.KAKAO_CLIENT_KEY,
  salt: process.env.PASSWORD_SALT,
  kakaoREST: process.env.KAKAO_REST_KEY,
  airkoreaKey: process.env.AIRKOREA_KEY,
  AWSaccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  AWSsecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  kakaoRedirectURL:
    'http://doodoo-env.eba-mumvd6gc.ap-northeast-2.elasticbeanstalk.com/api/auth/kakao/callback',
  imageUrl: 'https://doodoo-prod.s3.ap-northeast-2.amazonaws.com',
};
