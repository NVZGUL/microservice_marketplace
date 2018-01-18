const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const xlsx = require('node-xlsx');
const routeHelpers = require('./_helpers');
const pg = require('../../utils/pg');

const router = express.Router();
/* eslint-disable */

// get detail information about parts
router.get('/:id', (req, res, next) => {
    res.json({msg:'get detail'});
});

// http://example.com/search?q=some_string
router.get('/search', (req, res, next) => {
    res.json({msg: 'search'});
});

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    //console.log(file);
    checkFileType(file, cb);
  } 
}).single('myFile');

// Check File Type
const checkFileType = (file, cb) => {
  const filetypes = /xlsx|xls|vnd.ms-excel/;
  const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: text file only");
  }
}

router.post('/', routeHelpers.ensureAuth, (req,res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            if (req.file == undefined) {
                res.status(400).json({
                    error: 'File not selected'
                })
            } else {
                let file = `public/uploads/${req.file.filename}`
                let data = xlsx.parse(file)
                let obj = mapToObj(data[0].data);
                fs.unlinkSync(file);
                return pg('details').insertTest(obj)
                    .then(data => res.status(201).json({ msg: 'File uploaded'}))
                    .catch(err => next(err));
            }
        }
    });
})

// {category1: [arr...], category2: [arr...], ...}
const mapToObj = (arr) => {
    const header = arr[0];
    const data = arr.slice(1);
    let obj = {};
    obj.header = arr[0]
    obj.arr = arr.slice(1)
    /*
    for (let i = 0; i < header.length; i++) {
        obj[header[i]] = data.map((x) => x[i])
    }*/
    //console.log(obj)
    return obj;
}

module.exports = router;
