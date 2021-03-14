const express = require('express');
//const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// USSD routes
app.get('/', function (req, res) {
    res.send('Hello, world');
});

app.post('/', (req, res) => {
    // Read variables sent via POST from our SDK
    console.log(req.body);

    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";

    if ( text == "" ) {
        // This is the first request. Note how we start the response with CON
        response = "CON Please choose your healthcare service: 1. Emergency Alert \n2. Medication delivery\n3. Medical Appointment\n4. Clinic Availability";
    } else if ( text == '1') {
        // Business logic for first level response
        response = "CON Choose the emergency services you would like to access:\n 1. Emergency Hotline Numbers 2. Councelling Numbers";
    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Delivery for ${phoneNumber} is happening on 21/6/2021`;
    } else if ( text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC100101';
        // This is a terminal request. Note how we start the response with END
        response = `END Your account number is ${accountNumber}`;
    } else if ( text == '1*2') {
        // This is a second level response where the user selected 1 in the first instance
        const balance = 'KES 10,000';
        // This is a terminal request. Note how we start the response with END
        response = `END Your balance is ${balance}`;
    } else {
        response = "END Something is wrong"
    }

    // Print the response onto the page so that our SDK can read it
    res.send(response);
    // DONE!!!
});


app.listen(3000, () => {
    console.log(`App is running...`);
});
