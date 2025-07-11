export default function logger(req, res, next) {
  req.logs = req.logs || [];
  req.logs.push(`Method=${req.method} URL=${req.originalUrl} Time=${new Date().toISOString()}`);
  next();
}
