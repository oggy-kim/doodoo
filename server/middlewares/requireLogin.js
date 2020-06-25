module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: '로그인이 필요합니다.' });
  }

  next();
};
