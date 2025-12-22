// const Contact = require("../Models/ContactModel");
// const User = require("../Models/UserModel");


// exports.createContact = async (req, res) => {
//   try {
//     const { firstName, lastName, email, message } = req.body;

//     // Validation
//     if (!firstName || !lastName || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const contact = await Contact.create({
//       firstName,
//       lastName,
//       email,
//       message,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Contact message submitted successfully",
//       data: contact,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.getAllContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find()
//       .populate("from", "name email role")
//       .populate("to", "name email role")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: contacts.length,
//       contacts
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getContactById = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id)
//       .populate("from", "name email role")
//       .populate("to", "name email role");

//     if (!contact)
//       return res.status(404).json({ message: "Contact message not found" });

//     res.status(200).json({
//       success: true,
//       contact
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.updateContact = async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (!contact)
//       return res.status(404).json({ message: "Contact message not found" });

//     res.status(200).json({
//       success: true,
//       message: "Contact message updated successfully",
//       contact,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteContact = async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(req.params.id);
//     if (!contact)
//       return res.status(404).json({ message: "Contact message not found" });

//     res.status(200).json({
//       success: true,
//       message: "Contact message deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };





const Contact = require("../Models/ContactModel");

// 👉 Create Contact
exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Get All Contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Get Single Contact
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Update Contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
