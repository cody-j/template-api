import morgan from 'morgan';

const logger = morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
});

export default logger;
