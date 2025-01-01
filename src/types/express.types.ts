export {}
declare global {
    namespace Express {
        interface Request {
            path?: string;
        }
        interface Response {
            statusCode: number;
        }
    }
}
