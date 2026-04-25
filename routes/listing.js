const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage: storage });

const listingController = require("../controller/listing.js");

// ================= INDEX =================
// ================= CREATE =================
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

// ================= NEW =================
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ================= SHOW =================
// ================= UPDATE =================
// ================= DELETE =================
router.route("/:id")
    .get(isLoggedIn, wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        upload.single("listing[image]"), 
        validateListing,
        isOwner,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// ================= EDIT =================
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
module.exports = router;