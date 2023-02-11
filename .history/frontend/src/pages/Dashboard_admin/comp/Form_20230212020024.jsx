import React from 'react'
import { useState } from 'react';
import "./Form.css"
import axios from 'axios';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { storage } from '../../../firebase';
import {
    ref,
    uploadBytesResumable, getDownloadURL
} from "firebase/storage";
import { useNavigate } from 'react-router-dom';




// const locationfinder = () => {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         console.log("Latitude is :", position.coords.latitude);
//         setlatitude(position.coords.latitude)
//         console.log("Longitude is :", position.coords.longitude);
//         setlongitude(position.coords.longitude)

//     });
// }




export const DonorForm = () => {
    const [tableactive, settable] = React.useState('hide');
    const [donorNo, setdonorNo] = React.useState(0)
    const [User, setUser] = React.useState(null);
    const navigate = useNavigate()

    const [file, setFile] = useState("");
    const [imgurl, setimgurl] = useState('');
    const [longitude, setlongitude] = useState(0)
    const [latitude, setlatitude] = useState(0)
    const [title, setTitle] = useState('');
    const [quantity, setquantity] = useState(0);
    const [type, settype] = useState("Other");
    const [address, setaddress] = useState('');



    //   console.log(imgurl)





    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        console.log(event)
        setFile(event.target.files[0]);
    }
    const locationfinder = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            setlatitude(position.coords.latitude)
            console.log("Longitude is :", position.coords.longitude);
            setlongitude(position.coords.longitude)

        });
    }
    // const handlesubmit = () => {

    // }


    const handleUpload = () => {
        console.log(file)
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log(uploadTask)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
                console.log("uploaded")
            },
            (err) => console.log(err.message),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setimgurl(url)
                    console.log(url);
                });
            }
        );
    }
    useEffect(() => {
        locationfinder()
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            console.log(user)
            setUser(user)
        }
        else
            navigate('/')
    }, [])

    const handlesubmit = async (e) => {
        e.preventDefault()

        console.log(User)

        await axios.post('http://localhost:8000/addrequest', {
            email: User.email,
            latitude,
            longitude,
            photoUrl: imgurl,
            // message
        })
            .then((response) => {
                console.log(response.data);

            })
            .catch((err) => {
                console.log(err)
            })

    }



    return (
        <>
            <div className='donorForm'>
                <div className='form-css'>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="inputEmail4" onChange={(event) => setTitle(event.target.value)} placeholder="Title of the product" />
                        </div>
                    </div>

                    <div className="form-group col-md-6">
                        <input type="text" className="form-control" id="inputEmail4" onChange={(event) => setTitle(event.target.value)} placeholder="Description of the Product" />
                    </div>
                    <div className="form-row">

                        <div>
                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Upload waste image</label> <br />

                            <input type="file" onChange={handleChange} accept="/image/*" />
                            <br />
                            <br />
                            <button onClick={handleUpload}>Upload to Firebase</button>
                        </div>


                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
                </div>

            </div>
            <div className="listContainer">
                {/* {tableactive=="show" &&
         <>
         <div className="listTitle">Lastest Transactions</div>
            <TableX latitude={latitude} longitude={longitude} donorNo={donorNo} /></>
         } */}
            </div>


        </>



    )
}
