const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Request = require('../models/RequestModel');

router.post('/register', async (req, res) => {
    const data = req.body
    console.log(data.role)
    const user = await User.findOne({ email: data.email })

    if (user) {
        console.log('User already exists')
        return res.status(400).json({ error: 'User already exists' })
    }
    else {
        const user = new User({
            name: data.name,
            email: data.email,
            number: data.number,
            role: data.role,
            requests: [],
        })
        await user.save()
            .then((user) => {
                console.log(user)
                return res.status(200).json(user)
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    }
})

router.post('/login', async (req, res) => {
    const data = req.body

    const user = await User.findOne({ email: data.email })
    if (user) {
        console.log(user)
        return res.status(200).json(user)
    }
    else {
        console.log('User does not exist');
        return res.status(400).json({ error: 'User does not exist' })
    }
})

router.post("/notification", async (req, res) => {
    //Create a new user
    let donorNo = req.body.donorNo;
    let address = req.body.location;

    try {
        const accountSid = 'ACba58a05db6a6412dde27b4fe08227f7b';
        const authToken = 'c8e441c644ac7b9b3624931f4bbdf184';
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: `WasteBin is at your service! We have got your food Waste pickup request fullfield. We will come to pick up your waste at :address `,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+919399386770'
            })
            .then(message => console.log(message.sid))
            .done();
        return res.json({ "messege": "done" })



    }
    catch (err) {
        return res.status(409).json(err);
    }
})




module.exports = router;
