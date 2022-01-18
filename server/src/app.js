const express = require('express');
const cors = require('cors');                                                                                                                            
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const api = require('./routes/api');


const  app = express();

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives:{
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src":["'self'","'unsafe-inline'","example.com"]
        },
    })
);



app.use(express.static(path.join(__dirname,'../', 'public')));

app.use(cors({
    options:'http://localhost:3000'
}));


app.use(morgan('combined'));
app.use( express.json());



app.use('/v1',api);

app.get('/*', (req,res) =>{
    return res.sendFile(path.join(__dirname,'../','public', 'index.html'));
})

module.exports = app;