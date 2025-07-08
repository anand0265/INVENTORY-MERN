const Service = require('../models/service')


const createService = async(req,res) =>{
    
   try {
      const {
        ServiceName,
        ServiceCost,
        Description
    }  = req.body

    const newService =new Service({
         ServiceName,
        ServiceCost,
        Description

    })

    await newService.save();

    res.status(201).send({
        message:"Service created Successfully"
    })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Errorin creating Service"
        })
        
    }
}

const getService = async(req,res) =>{
    try {
        const service = await Service.find().sort({ createdAt: -1 });

        if(!service){
            res.status(500).send({
                message:"Service not Found"
            })
        }

        res.status(201).send({
            service
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Error in fetching Services"
        })
    }
}

const deleteService = async(req,res) =>{
    try {
        const id = req.params.id

        const Dservice = await Service.findByIdAndDelete(id);

        if(!Dservice){
             return res.status(404).json({ message: 'Service not found' });
        }

         res.status(200).json({ message: 'Service deleted successfully', service: Dservice });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in Delete Service API"
        })
        
    }
}


module.exports={createService, getService, deleteService}