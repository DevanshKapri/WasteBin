const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Request = require('../models/RequestModel');

router.post('/register', async(req, res) => {
    const data = req.body
    console.log(data.role)
    const user = await User.findOne({ email : data.email})

    if(user) {
        console.log('User already exists')
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
                    console.log(user)
                    return res.status(200).json(user)
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json(err)
                })
    }
})

router.post('/login', async(req, res) => {
    const data = req.body

    const user = await User.find({ email : data.email})
    if(user) {
        console.log(user)
        return res.status(200).json(user)
    }
    else {
        console.log('User does not exist');
        return res.status(400).json({ error : 'User does not exist'})
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
            latitude : data.latitude,
            longitude : data.longitude,
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
        let req = await Request.find();
        if(request) {
            if(request.status === 'accepted') {
                console.log("already accepted");
                return res.status(200).json(req);
            }
            request.status = 'accepted'
            request.collector = user._id
            user.requests.push(request._id);
            await user.save()
                .then((user) => {
                    console.log(user)
                })
                .catch((err) => {
                    console.log(err)
                })
            request.approveTime = data.approveTime
            await request.save()
                        .then((request) => {
                            for(let i=0;i<req.length;i++){
                                if(req[i].collector === request._id){
                                    req[i].status = 'accepted'
                                }
                            }
                            return req;
                        })
                        .then((req) => {
                            return res.status(200).json(req)
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
    let req = await Request.find();
    if(user && user.role === 'collector' && user.status === 'verified') {
        const request = await Request.findOne({ _id : data.requestId})
        if(request) {
            request.status = 'completed'
            await request.save()
                        .then((request) => {
                            for(let i = 0; i < request.length; i++){
                                if(req[i].collector === request._id){
                                    req[i].status = 'completed'
                                }
                            }
                            return req;
                        })
                        .then((req) => {
                            return res.status(200).json(req)
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

router.post('/getAllCollectors', async(req, res) => {
    const data = req.body
    const user = await User.findOne({ email: data.email})
    if(user && user.role === 'admin') {
        const collectors = await User.find({ role: 'collector'})
        return res.status(200).json(collectors)
    }
    else {
        return res.status(400).json({ error : 'User does not exist or is not an admin'})
    }
})

router.post('/verifyCollector', async(req, res) => {
    const data = req.body
    const user = await User.findOne({ email: data.email})
    const col = await User.findOne({ role : 'collector'})
    if(user && user.role === 'admin') {
        const collector = await User.findOne({ _id : data.collectorId})
        if(collector) {
            collector.status = 'verified'
            await collector.save()
                        .then((collector) => {
                            for(let i=0;i<col.length;i++){
                                if(col[i].status === 'unverified'){
                                    col[i].status = 'verified'
                                }
                            }
                            return col;
                        })
                        .then((col) => {
                            return res.status(200).json(col)
                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(500).json(err)
                        })
        }
        else {
            return res.status(400).json({ error : 'Collector does not exist'})
        }
    }
    else {
        return res.status(400).json({ error : 'User does not exist or is not an admin'})
    }
})




module.exports = router;
