const express = require('express');
const { getPort, getDBUrl } = require('./src/utils/configs')
const app = express();
const port = getPort();
const DBUrl = getDBUrl()
const { DBInit }  = require('./src/utils/DBInit');
const userRoute = require('./src/routes/userRoute');
const newsRoute = require('./src/routes/newsRoute');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoute);
app.use('/api/news', newsRoute);

app.listen(port, async () => {
    try {
        await DBInit(DBUrl);
        console.log('Database connected...');
        console.log(`listening on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});