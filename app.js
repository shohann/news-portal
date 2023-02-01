const express = require('express');
const cookieParser = require('cookie-parser');
const { getPort, getDBUrl } = require('./src/utils/configs')
const app = express();
const port = getPort();
const DBUrl = getDBUrl();
const { DBInit }  = require('./src/utils/DBInit');
const homeRoute = require('./src/routes/homeRoute')
const userRoute = require('./src/routes/userRoute');
const newsRoute = require('./src/routes/newsRoute');
const commentRoute = require('./src/routes/commentRoute');
const categoryRoute = require('./src/routes/categoryRoute');

const { cacheDBInit } = require('./src/cache/cacheDBInit');

app.use(express.static('public'))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', homeRoute)
app.use('/api/users', userRoute);
app.use('/api/news', newsRoute);
app.use('/api/comments', commentRoute);
app.use('/api/categories', categoryRoute);


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`
    });
});

app.use((err, req, res, next) => {
    if (!err.status || !err.message) {
        err.status = 500;
        err.message = `Internal Server Error: ${err}`
    }

    res.status(err.status).json({
        message: err.message,
    });
});

app.listen(port, async () => {
    try {
        await DBInit(DBUrl);
        await cacheDBInit();
        console.log('redis connected..app level..');
        console.log('Database connected...');
        console.log(`listening on port ${port}`);
    } catch (error) {

        console.log(error);
    }
});