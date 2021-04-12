const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

let port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set your app credentials
const credentials = {
    apiKey: '83a856ef45150c8227c327f4d4da9a6e5c4fc9774f8a8a69e6ba63632fc8ddbf',
    username: 'sandbox',
};

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

// USSD routes
app.get('/', function (req, res) {
    res.send('Hello, world');
});

app.post('/ussd', (req, res) => {
    // Read variables sent via POST from our SDK
    console.log(req.body);

    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";

    if ( text == "" ) {
        // This is the first request. Note how we start the response with CON
        response = `CON Welcome to the MS Power Africa and AT event: \n 1. Check your phone number \n2. Get your surpirse message`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Your phone number is ${phoneNumber} `;
    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        //Send a message
        const options = {
            to: phoneNumber,
            message: "SURPRISE"
        };
        let resp = sms.send(options);
        console.log(resp);
        response = `END Hey there! Check your messages :D`;
    } else {
        response = "END Something is wrong"
    }

    // Print the response onto the page so that our SDK can read it
    res.send(response);
    // DONE!!!
});


app.listen(port, () => {
    console.log(`App is running... on port ${port}`);
});
