const app = require('./app');
const databaseConnect = require('./config/database');

const port = process.env.PORT || 4000;

// database connect
databaseConnect();

app.listen(port, () => {
    console.log(`Server started at port:${port}`);
})