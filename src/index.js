import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
// import lumie from 'lumie';
import morgan from 'morgan';
// import path from 'path';
import dbConnect from './config/db';
import http from 'http';
// import { initSocket } from './utils/socket.js';
import userRoutes from '../src/controllers/users/users.routing.js'
import authRoutes from '../src/controllers/auth/auth.routing.js'
import branchesRoutes from '../src/controllers/branches/branches.routing.js'
import roleRoutes from '../src/controllers/role/role.routing.js'

dotenv.config();

const app = express();
const server = http.createServer(app);
// Middlewares
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));

// Routing (Lumie)
// Note: __dirname babel ke saath kabhi kabhi issue karta hai, isliye path resolve use karein
// lumie.load(app, {
//     preURL: 'api',
//     verbose: true,
//     ignore: ['.spec', '*.md'],
//     controllers_path: path.join(__dirname, 'controllers'),
// });

app.use('/api/v1/users', authRoutes);
app.use('/api/v1/branches', branchesRoutes);
app.use('/api/v1/role', roleRoutes);
app.use('/api/v1/users', userRoutes);


// Database Connection Function
const connectDB = async () => {
    try {
        await dbConnect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error);
    }
};

const port = process.env.PORT || 4000;

// Socket sirf local environment mein init karein
// initSocket(server);

server.listen(port, () => {
    console.log('App server started on port ' + port);
});
connectDB();


export default app;