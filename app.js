const express = require('express');
const app = express();
const { port } = require('./config/default')
const { DBUrl } = require('./config/custom-environment-variables');
const { DBInit }  = require('./src/utils/DBInit');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.listen(port, async () => {
    try {
        await DBInit(DBUrl);
        console.log('Database connected...');
        console.log(`listening on port ${port}`);
    } catch (error) {
        console.log(error.message);
    }
});