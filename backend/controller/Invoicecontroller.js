


const Invoice = require('../models/Invoice');

const createInvoice = async (req, res) => {
  try {
    const {
      Invoice_number,
      client,
      Invoice_date,
      Due_date,
      status,
      product,
      service,
      note,
      grand_total,
    } = req.body;

    const newInvoice = new Invoice({
      Invoice_number,
      client,
      Invoice_date,
      Due_date,
      status,
      product,
      service,
      note,
      grand_total,
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error('Invoice creation error:', error.message);
    res.status(500).json({ message: 'Error creating invoice', error: error.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id)
      .populate('client')
      .populate('product.productId')
      .populate('service.serviceId');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoice', error: error.message });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('client')
      .populate('product.productId')
      .populate('service.serviceId');

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
};
