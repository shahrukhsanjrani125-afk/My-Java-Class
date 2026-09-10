import rateLimit from 'express-rate-limit';
import { config } from '../config';
export const rateLimiter = (key: keyof typeof config.rateLimits) => {
  const opts = config.rateLimits[key];
  if (!opts) throw new Error(`Rate limit config for "${key}" not found`);
  return rateLimit({
    windowMs: opts.windowMs,
    max: opts.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests' } }
  });
};
