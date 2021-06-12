const contact = require("../model/contacts.schema");
const joi = require("joi");

exports.addContact = async (req, res) => {
    const contactDetailsSchema = joi.object({
        name: joi.string().required().min(3),
        email: joi.string().required().email(),
        phone: joi.string().required().length(10),
        type: joi.string().required(),
        userId: joi.required()
    });
    try {

        let contactDetails = await contactDetailsSchema.validateAsync(req.body);
        let isContactExist = await contact.findOne({
            $and: [{
                    userId: contactDetails.userId
                },
                {
                    phone: contactDetails.phone
                }
            ]
        });
        if (!isContactExist) {
            const newContact = new contact(contactDetails);

            await newContact.save();
            res.status(200).json({
                message: "Contact added successfully"
            });
        } else {
            res.status(200).json({
                message: "Phone number is already linked with another contact"
            });
        }

    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
    }
}

exports.updateContact = async (req, res) => {
    const contactDetailsSchema = joi.object({
        name: joi.string().required().min(3),
        email: joi.string().required().email(),
        phone: joi.string().required().length(10),
        type: joi.string().required(),
        userId: joi.required()
    });
    let contactId = req.params.id;
    try {
        let contactDetails = await contactDetailsSchema.validateAsync(req.body);
        const updateContact = await contact.findByIdAndUpdate(contactId, {
            $set: contactDetails
        });
        if (updateContact) {
            res.status(200).json({
                message: "update successfully",
            });
        } else {
            res.status(200).json({
                message: "Contact doesn't exist"
            });
        }
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
    }
}

exports.deleteContact = async (req, res) => {
    let contactId = req.params.contactId;

    try {
        const deleteContact = await contact.findByIdAndDelete(contactId);
        if (deleteContact) {
            res.status(200).json({
                message: "delete successfull"
            });
        } else {
            res.status(200).json({
                message: "Contact doesn't exist"
            })
        }

    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
    }
}

exports.contacts = async (req, res) => {
    try {
        const usercontacts = await contact.find({
            userId: req.params.userid
        });
        res.status(200).json({
            message: "Data fetched succssfully",
            contacts: usercontacts
        });
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
    }
}

exports.getContactById = async (req, res) => {
    let id = req.params.contactId;
    try {
        const getContact = await contact.findById(id);
        if (getContact) {
            res.status(200).json({
                message: "Contact fetched successfully",
                contact: getContact
            });
        } else {
            res.status(200).json({
                message: "Contact doesn't exist",
            });
        }

    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
    }
}