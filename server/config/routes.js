var photos = require('../controllers/photos')
var multer = require('multer')
var AWS = require('aws-sdk')
var multerS3 = require('multer-s3')

AWS.config.loadFromPath(__dirname + '/s3_config.json');
var s3 = new AWS.S3()

// FOR SAVING LOCALLY
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + '/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//   }
// })
// var upload = multer({ storage: storage })

//SAVING TO S3
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'jpvcameratestbucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname + '-' + Date.now() + '.jpg'});
    },
    key: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
})

module.exports = function(app){
    app.post('/savePhoto', upload.single("photoData"), photos.savePhoto)
    app.post('/getPhotos', photos.getPhotos)
}