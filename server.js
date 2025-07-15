import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/',(req,res)=> res.send("API is working"))
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)

const PORT = process.env.PORT || 3000;

function startServer() {
    app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
}

startServer();

process.on('uncaughtException', (err) => {
    console.log('Server crashed with error: ', err);
    setTimeout(() => {
        console.log('Restarting server...');
        startServer();
    }, 5000);
});
