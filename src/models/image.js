var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema for Image
var ImageSchema = new Schema({
	url: {
		type: String,
		required: true
	},
	fileName : {
		type: String,
		require: true
	},
	imageType: {
		type: Number,
	},
	user : {
        type: Number,
	}
});

//Define the model for Image
var Image;
if(mongoose.models.Image)
	Image = mongoose.model('Image');
else
	Image = mongoose.model('Image', ImageSchema);
//Export the Image Model
module.exports = Image;
