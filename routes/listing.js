const express=require("express");
const router =express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}= require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}= require("../cloudconfig.js");
const Upload= multer({storage});


router.route("/")
.get(wrapAsync(listingController.index))

.post(isLoggedIn,Upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))

.put(isLoggedIn,isOwner,Upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))

.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))


 

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));
 
module.exports=router;