const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({dest : "uploads/"});

router.post("/add",auth,contactController.addContact);

router.put("/update/:id",auth,contactController.updateContact);

router.delete("/delete/:contactId",auth,contactController.deleteContact);

router.get("/contacts/:userid",auth,contactController.contacts);

router.get("/contactById/:contactId",auth,contactController.getContactById);

router.post("/upload",upload.single("imagefile"),(req,res)=>{
    res.status(200).json({
        details : req.file
    });
});

module.exports = router;