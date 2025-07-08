const Supplier = require('../models/Supplier')


const createSupplier = async(req,res)=>{
    try {
        const {
            supplierName,
            companyName,
             vatNumber,
              email,
              phone,
              address,
                country,
                city,
                  state,
                    postalCode,
         } = req.body

         const supplier = new Supplier({
            supplierName,
            companyName,
             vatNumber,
              email,
              phone,
              address,
                country,
                city,
                  state,
                    postalCode,
         })

         await supplier.save();
             res.status(201).json({ message: 'Supplier created successfully ✅', supplier });
        
    } catch (error) {
        console.error('Error creating supplier:', error.message);
        res.status(500).send({
message: 'Server error', error: error.message
        })
        
    }
}

const getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.find();

    if (supplier.length === 0) {
      return res.status(404).send({
        message: "No suppliers found"
      });
    }

    res.status(200).json(supplier);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in fetching suppliers",
      error: error.message
    });
  }
};


const deleteSupplier = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Supplier.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send({
        message: "Supplier not found"
      });
    }

    res.status(200).send({
      message: "Supplier deleted successfully ✅"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in delete API",
      error: error.message
    });
  }
};



module.exports={createSupplier , getSupplier , deleteSupplier};