const httpClient = require('request-promise');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dotenv.config();

const apiKey = process.env.API_KEY;
const apiRootUrl = process.env.API_ROOT_URL;

app.get('/', (req, res) => {
    return res.render('index');
});

app.get('/data', async (req, res) => {
    try {
        const options = {
            url: apiRootUrl + '/retailer-data',
            headers: {
                'Authorization': apiKey
            },
            method: 'GET'
        };
    
        const response = await httpClient(options);
        
        res.set('Content-Type', 'application/json');
        return res
            .end(response);

    } catch (error) {
        return res
            .status(500)
            .json({
                message: error.message
            });
    }
});

app.post('/sms-message', async (req, res) => {
    try {
        const options = {
            url: apiRootUrl + '/get-sms-wording',
            headers: {
                'Authorization': apiKey
            },
            method: 'POST',
            form: req.body
        };
    
        const response = await httpClient(options);
        
        res.set('Content-Type', 'application/json');
        return res
            .end(response);

    } catch (error) {
        return res
            .status(500)
            .json({
                message: error.message
            });
    }
});

app.post('/process', async (req, res) => {
    try {
        const options = {
            resolveWithFullResponse: true,
            url: apiRootUrl + '/process',
            headers: {
                'Authorization': apiKey
            },
            method: 'POST',
            form: req.body
        };
    
        const response = await httpClient(options);
        
        res.set('Content-Type', 'application/json');
        return res
            .end(response.body);

    } catch (error) {
        var response = JSON.parse(error.error);
        return res
            .status(error.statusCode)
            .json({
                message: response.message
            });
    }
});

app.listen(8000, () => {
    console.log('app is running on port 8000');
});