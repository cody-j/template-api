import morgan from 'morgan';
import fs from 'fs';

// Custom token for response body size
// morgan.token('res-body-size', (req, res) => {
//     return res.get('Content-Length') || '-';
// });

// // Custom token for user id (assuming auth middleware sets req.user)
// morgan.token('user-id', (req) => {
//     return req.user?.id || 'anonymous';
// });

// Custom format
// const logFormat = ':remote-addr - :user-id [:date[iso]] ":method :url HTTP/:http-version" :status :res-body-size :response-time[digits]ms ":referrer" ":user-agent"';

// Different formats for different environments
// if (process.env.NODE_ENV === 'production') {
//     // Stream to rotating file
//     const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });
    
//     app.use(morgan(logFormat, {
//         stream: accessLogStream,
//         skip: (req, res) => res.statusCode < 400  // Only log errors
//     }));
// } else {
//     // Development: colorized console output
//     app.use(morgan('dev', {
//         skip: (req) => req.path === '/health'  // Skip health checks
//     }));
// }

const logFormat = process.env.NODE_ENV === 'production'
    ? 'dev'
    : ':remote-addr - :user-id [:date[iso]] ":method :url HTTP/:http-version" :status :res-body-size :response-time[digits]ms ":referrer" ":user-agent"';

const options = process.env.NODE_ENV === 'production'
    ? {
        stream: fs.createWriteStream('access.log', { flags: 'a' }),
        skip: (req: Express.Request, res: Express.Response) => res.statusCode < 400,  // Only log errors
    }
    : { skip: (req: Express.Request) => req.path === '/health' }; 
    
export default morgan(logFormat, options);

// For API routes, add more detailed logging

