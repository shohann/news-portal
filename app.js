const express = require('express');
const cookieParser = require('cookie-parser');
const { getPort, getDBUrl } = require('./src/utils/configs');
const { handleError, handleUnknownRoute } = require('./src/middlewares/handleError')
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

app.all('*', handleUnknownRoute);
app.use(handleError);

app.listen(port, async () => {
    try {
        await DBInit(DBUrl);
        await cacheDBInit();
        console.log('Redis connected..');
        console.log('MongoDB connected...');
        console.log(`Server listening on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});