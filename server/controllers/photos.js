var mongoose = require('mongoose')
var Photo = mongoose.model('Photo')

module.exports = {
    savePhoto: function(req, res, next) {
        let latitude = parseFloat(req.body.latitude)
        let longitude = parseFloat(req.body.longitude)
        let altitude = parseFloat(req.body.altitude)
        let username = req.body.username

        let location = req.file.location

        var newPhoto = new Photo()

        newPhoto.altitude = altitude
        newPhoto.longitude = longitude
        newPhoto.latitude = latitude
        newPhoto.username = username
        newPhoto.location = location

        newPhoto.save(function (err) {
            if (err) {
                console.log(err)
                res.json(false)
            } else {
                console.log("save succeeded")
                res.json(true)
            }
        })
    },
    getPhotos: function(req, res, next) {
        let latitude = req.body.latitude
        let longitude = req.body.longitude
        let altitude = req.body.altitude

        Photo.find({latitude: {$gte: latitude - 0.06, $lte: latitude + 0.06}, longitude: {$gte: longitude - 0.06, $lte: longitude + 0.06}}, function(err, photos) {
            if(err) {
                console.log("error when retrieving photos")
                res.json({status: false})
            } else {
                if(photos) {
                    console.log("found photos")
                    //console.log(photos)
                    res.json({status: true, photos: photos})
                } else {
                    console.log("unable to find photos")
                    res.json({status: false})
                }
            }
        }) 
    }
}
