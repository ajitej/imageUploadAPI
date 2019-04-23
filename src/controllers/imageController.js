var fs = require('fs');
var Image = require('../models/image');
//Controller for Image API
var ImageController = {
	//Upload the Image
	//Common method to upload images based on ImageType
	busboyUpload: function(req, res, imageType){
		console.log("Upload");
		//Proccess the fields/files utilising BusBoy Library
		req.pipe(req.busboy);
		req.busboy.on('file', function(fieldname, file, filename) {
			console.log("Busboy File");
            
			//Save the File
			var fstream;
				fstream = fs.createWriteStream('./images/' + filename);
			
			file.pipe(fstream);
			fstream.on('close', function () {
				console.log("File close");
				var image = new Image();      
                    
                image.fileName = filename;
                image.url = './images/' + filename;
	
                image.save(function(err){
                    if(err){
                        res.json(err);
                    }
                    
                    res.json({
                        success: true,
                        path: image.url,
                        fileName: image.fileName
                    })
                });
            });
		});
    },
    
    base64Upload: function(req, res){
        var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
        var filename = 'testImage';
        let extension, lowerCaseData = base64Data.toLowerCase();
        if(lowerCaseData.indexOf('png') !== -1){
            extension = '.png'
        }else if(lowerCaseData.indexOf('jpg') !== -1){
            extension = '.jpg'
        }else if(lowerCaseData.indexOf('jpeg') !== -1){
            extension = '.jpeg'
        }
        fs.writeFile('./images/' + filename + extension, base64Data, 'base64', function (err) {
            var image = new Image();      
                    
            image.fileName = filename;
            image.url = '/images/' + filename + extension;
            image.imageType= req.body.imageType;
            image.user = req.body.user;

            image.save(function(err){
                if(err){
                    res.json(err);
                }
                
                res.json({
                    success: true,
                    path: image.url,
                    fileName: image.fileName,
                    imageType: req.body.imageType,
                    user: req.body.user
                })
            });
        });
    }
}

module.exports = ImageController;
