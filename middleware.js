const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const Joi = require("joi");

// ================= LOGIN =================
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

// ================= JOI =================
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().uri().allow("", null), 
        price: Joi.number().required(),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

// ================= VALIDATION =================
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        let msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }
    next();
};

// ================= OWNER =================
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// ================= REDIRECT =================
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// ================= REDIRECT URL =================
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);  // ✅ FIX

    // handle missing listing
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    // handle missing owner safely
    if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that");
        return res.redirect(`/listings/${id}`);
    }

    next();  // ✅ VERY IMPORTANT
};