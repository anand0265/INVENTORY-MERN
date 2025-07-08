const Contact = require('../models/Contact');
const bcrypt = require('bcryptjs');


exports.createContact = async (req, res) => {
  try {
    const {
      profileType,
      companyName,
      contactName,
      contactEmail,
      contactPhone,
      country,
      group,
      city,
      state,
      zip,
      address,
      remarks,
      facebook,
      twitter,
      linkedin,
      loginEnabled,
      loginName,
      loginEmail,
      loginPassword,
      status,
    } = req.body;

    let hashedPassword = null;

    if (loginEnabled && loginPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(loginPassword, salt);
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const contact = new Contact({
      profileType,
      companyName,
      contactName,
      contactEmail,
      contactPhone,
      country,
      group,
      city,
      state,
      zip,
      address,
      remarks,
      facebook,
      twitter,
      linkedin,
      imageUrl,
      loginEnabled,
      loginName,
      loginEmail,
      loginPassword: hashedPassword,
      status,
    });

    await contact.save();

    res.status(201).json({ message: 'Contact created successfully ✅', contact });
  } catch (error) {
    console.error('Error creating contact:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Optional: sort by latest
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteContacts = async (req,res) =>{
  try {
   const id = req.params.id;

    const deleteContact =await Contact.findByIdAndDelete(id)

     if (! deleteContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully', contact: deleteContact });
    
  } catch (error) {
     console.error('Error deleting contacts:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
