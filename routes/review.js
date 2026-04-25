const express = require("express");
const router = express.Router({ mergeParams: true }); // 🔥 IMPORTANT
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const reviewController = require("../controller/review.js");

// VALIDATION
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map(d => d.message).join(", ");
        throw new ExpressError(400, errmsg);
    }
    next();
};

// CREATE REVIEW (SAME URL FORMAT)
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// DELETE REVIEW (SAME FORMAT)
router.delete("/:reviewId", wrapAsync(reviewController.destroyReviews));

module.exports = router;