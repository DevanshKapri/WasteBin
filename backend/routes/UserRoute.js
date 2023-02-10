const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Request = require('../models/RequestModel');

router.post('/register', async(req, res) => {
    const data = req.body

    const user = await User.findOne({ email : data.email})

    if(user) {
        return res.status(400).json({ error : 'User already exists'})
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
                    return res.status(200).json(user)
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json(err)
                })
    }
})

router.get('/getRequests', async(req, res) => {
    const requests = await Request.find()
    console.log(requests)
    return res.status(200).json(requests)
})


router.post('/addRequest', async(req, res) => {
    const data = req.body
    const user = await User.findOne({ email : data.email})
    if(user) {
        const request = new Request({
            message : data.message,
            photoUrl : data.photoUrl,
            user : user._id,
            status : 'pending',
            collector : null,
        })
        await request.save()
                    .then((request) => {
                        user.requests.push(request._id)
                        user.save()
                        return res.status(200).json(request)
                    })
                    .catch((err) => {
                        console.log(err)
                        return res.status(500).json(err)
                    })
    }
    else {
        return res.status(400).json({ error : 'User does not exist'})
    }
})

router.post('/acceptRequest', async(req, res) => {
    const data = req.body
    const user = await User.findOne({ email : data.email})
    if(user && user.role === 'collector' && user.status === 'verified') {
        const request = await Request.findOne({ _id : data.requestId})
        if(request) {
            request.status = 'accepted'
            request.collector = user._id
            request.approveTime = data.approveTime
            await request.save()
                        .then((request) => {
                            return res.status(200).json(request)
                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(500).json(err)
                        })
        }
        else {
            return res.status(400).json({ error : 'Request does not exist'})
        }
    }
    else {
        return res.status(400).json({ error : 'User does not exist or is not a verified collector'})
    }
})

router.post('/completeRequest', async(req, res) => {
    const data = req.body
    const user = await User.findOne({ email : data.email})
    if(user && user.role === 'collector' && user.status === 'verified') {
        const request = await Request.findOne({ _id : data.requestId})
        if(request) {
            request.status = 'completed'
            await request.save()
                        .then((request) => {
                            return res.status(200).json(request)
                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(500).json(err)
                        })
        }
        else {
            return res.status(400).json({ error : 'Request does not exist'})
        }
    }
    else {
        return res.status(400).json({ error : 'User does not exist or is not a verified collector'})
    }
})



module.exports = router;
