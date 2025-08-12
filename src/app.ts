import express from 'express';
import { json } from 'body-parser';
import { setRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
setRoutes(app);

app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}!`);
});
