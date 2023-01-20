const express = require('express');
const config = require('config');
const app = express();
const port = config.get('port');
const DBUrl = config.get('DBUrl');
const { DBInit }  = require('./src/utils/DBInit');
const userRoute = require('./src/routes/userRoute');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoute);

app.listen(port, async () => {
    try {
        await DBInit(DBUrl);
        console.log('Database connected...');
        console.log(`listening on port ${port}`);
    } catch (error) {
        console.log(DBUrl);
        console.log(error);
    }
});