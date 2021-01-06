export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/artistsalbuns',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'vlI0aHfnFp28kIxkJS_DpraYWhCfEycR3T-T7Fr8PLzn1VhsbyxjNSBVcy77zl6hF_5qcOF9Re7Acb9rg7XnLzZkqhvsMUmzsvcmnotc30xtecifl2PgNpFqPKrd1sH-6HWF5KtlgVabFVAmNQm24BjEYIU3RlxJa9or6UXxQ6s'
}
