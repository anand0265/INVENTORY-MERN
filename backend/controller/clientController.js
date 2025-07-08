const Client = require('../models/Client');

// Create Client
const createClient = async (req, res) => {
  try {
    const {
      profile_type,
      company_name,
      contact_name,
      contact_phone,
      contact_email,
      country,
      group
    } = req.body;

    const client = new Client({
      profile_type,
      company_name,
      contact_name,
      contact_phone,
      contact_email,
      country,
      group
    });

    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client', error });
  }
};

// Get All Clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};

// Delete Client by ID
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error });
  }
};

module.exports = {
  createClient,
  getAllClients,
  deleteClient
};
