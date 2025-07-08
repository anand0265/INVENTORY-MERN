


const Quotation = require('../models/Quotation');

const createQuotation = async (req, res) => {
  try {
    const {
      Quotation_number,
      client,
      Quotation_date,
      product,
      service,
      note,
      grand_total,
    } = req.body;

    const newQuotation = new Quotation({
      Quotation_number,
      client,
      Quotation_date,
      product,
      service,
      note,
      grand_total,
    });

    const savedQuotation = await newQuotation.save();
    res.status(201).json(savedQuotation);
  } catch (error) {
    console.error('Quotation creation error:', error.message);
    res.status(500).json({ message: 'Error creating Quotation', error: error.message });
  }
};

const getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await Quotation.findById(id)
      .populate('client')
      .populate('product.productId')
      .populate('service.serviceId');

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    res.status(200).json(quotation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Quotation', error: error.message });
  }
};


const getAllQuotations = async (req, res) => {
  try {
    const Quotations = await Quotation.find()
      .populate('client')
      .populate('product.productId')
      .populate('service.serviceId');

    res.status(200).json(Quotations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Quotations', error: error.message });
  }
};

module.exports = {
  createQuotation,
  getQuotationById,
  getAllQuotations,
};
