
const express = require('express');


const router = express.Router();

require('../db/dbconn');

const review = require('../models/reviewSchema');
// storege routes

// upload blogs
router.post('/addreview', (req, res) => {
    const newreview = new review({
        name: req.body.name,
        university: req.body.university,
        review: req.body.review,
        course: req.body.course,
        rating: req.body.rating,
        status: 'Denied',  
    });
    newreview.save().then(() => res.json("review posted"))
        .catch((error) => { res.status(400).json({ error: "server error" }) })
})
// get review data


// fetch blogs.sort(mysort)
router.get('/getreview', (req, res) => {
    const regex = new RegExp('Denied', 'i');
    review.find({ status: regex }).sort({
        date: -1,
    }).then((result) => {
        res.status(200).json(result)
    })

});

router.put("/updatereview/:id", (req, res) => {
    review.findById(req.params.id).then((article) => {

        article.status = 'Approved';

        article.save().then(() => res.json("status Updated, Status code 202")).
            catch((err) => res.status(400).json(`Error:${err}`));

    })
})

// sort
router.get('/filterreview', (req, res) => {
    const regex = new RegExp('Approved', 'i');
    review.find({ status: regex }).sort({
        date: -1,
    }).then((result) => {
        res.status(200).json(result)
    })
});

//   filter by rating
router.get('/filterrating/:rating', function (req, res) {
    const regex = new RegExp(req.params.rating, 'i');
    const re = new RegExp('Approved', 'i');
    review.find({ rating: regex , status: re  }||{ course:regex , status:re}).sort({
        date: -1
    }).then((result) => {
        res.status(200).json(result)
    })

})

module.exports = router;