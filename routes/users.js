const express = require('express');

const router = express.Router();



const bodyParser = require('body-parser')
const fs = require('fs');
const { json } = require('express');

const AWS = require('aws-sdk');
const key = require('./keys.js');
const s3 = new AWS.S3();

const { setTimeout } = require('timers/promises');
// router.post('/start',async (req, res) => {

//     try {
     
//         let payload = { banner: 'B00888136', ip: 'http://34.218.249.213:5000' };
    
//         let res = await axios.post('http://52.23.207.11:8081/start', payload);
    
//         let data = res.data;
//         console.log(data);   
//         } catch (error) {
//             console.log(error);
//         }
// })
 router.post('/storedata',async (req, res) => {

    try {
        await setTimeout(2000, 'result')
        const data = req.body.data;
        const filename = "test.txt";
        if (data === undefined) {
            return res.status(404).json({
                message: "missing attributes",
                success: false,
            })
        }


        const params = {
            Bucket: 'data-ass2',
            Key: filename,
            Body: data
        };
        s3.upload(params, function (err, data) {
            console.log(err, data);
            return res.status(200).json({
                s3uri: data.Location
            })
        });
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server Error",
            success: false,
        })
    }
})

//there is nothing called append in s3 once something is uploaded it's uploaded. so just download and reupload after appending
router.post('/appenddata',async (req, res) => {

    try {
        await setTimeout(2000, 'result')
        console.log(res);
        const newdata = req.body.data;
        var updetedData;
        var getParams = {
            Bucket: 'data-ass2',
            Key: "test.txt"
        };

        s3.getObject(getParams, function (err, data) {
            if (err) console.log(err, err.stack);
            else {
                console.log(data.Body.toString());
                updetedData = data.Body.toString();
                updetedData = updetedData + newdata.toString();
                console.log(updetedData);
                var putParams = {
                    Body: updetedData,
                    Bucket: 'data-ass2',
                    Key: "test.txt",
                };

                s3.putObject(putParams, function (err, data) {
                    if (err) console.log(err, err.stack);
                    else {
                        console.log(data);
                        return res.status(200).json({
                            s3uri: "https://data-ass2.s3-us-west-2.amazonaws.com/test.txt"
                        })
                    }
                });
            }
        });



    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server Error",
            success: false,
        })
    }
})



router.post('/deletefile',async (req, res) => {

    try {
        await setTimeout(2000, 'result')
        console.log(res);
        const filename = "test.txt";
       
        var params = {
            Bucket: 'data-ass2',
            Key: "test.txt",
        };
        s3.deleteObject(params, function(err, data) {
            if (err) console.log(err, err.stack);  // error
            else{     return res.status(404).json({
                message: "deleted",
                
            })}                 // deleted
          });
          
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server Error",
            success: false,
        })
    }
})




module.exports = router;