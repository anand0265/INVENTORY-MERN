const contactGroup = require('../models/ContactGroup')


exports.createContactGroup = async(req,res) =>{
    const {Groupname, note} =req.body

    try {

        const newGroup = contactGroup({
            Groupname, note
        })

        await newGroup.save();

        res.status(201).send({
            message:"Group created successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in create Group"
        })
    }
    
}

exports.getContactGroup = async(req,res) =>{
    try {
        const  contact = await contactGroup.find();
     res.status(200).json( contact);
        
    } catch (error) {
        console.error('Error fetching contact:', error);
    res.status(500).json({ message: 'Server error while fetching contacts' });
        
    }
    
}
exports.deleteContactGroup = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedGroup = await contactGroup.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).json({ message: 'Contact Group not found' });
    }

    res.status(200).json({ message: 'Contact Group deleted successfully', group: deletedGroup });
  } catch (error) {
    console.log('Error in delete contact:', error);
    res.status(500).json({ message: 'Server error in delete contact' });
  }
};