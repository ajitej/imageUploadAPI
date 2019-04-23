//import the required modules
var express = require('express');
var router = express.Router();

var imageController = require('../controllers/imageController');

router.route('/v1/uploadimage/busboy')
.post(imageController.busboyUpload);

router.route('/v1/uploadimage/baseconverted')
.post(imageController.base64Upload);

module.exports = router;