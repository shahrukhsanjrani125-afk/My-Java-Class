import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigins }));
app.use(express.json());
app.use('/api/v1', routes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(errorHandler);

export default app;
