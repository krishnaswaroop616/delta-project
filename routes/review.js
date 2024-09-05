const express=require("express");
const router =express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/reviews.js");
const Listing =require("../models/listing.js");
const {validateReview,isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewContoller=require("../controllers/reviews.js");

 //reviews route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewContoller.createReview));

//Delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewContoller.destroyReview));

module.exports=router;