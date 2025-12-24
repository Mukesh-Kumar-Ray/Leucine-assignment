import Equipment from "../models/equipment.model.js";

export const getEquipment = async (req, res) => {
    try {
         const getEquipmentData = await Equipment.find();
         res.status(200).json(getEquipmentData);
    } catch (error) {
        console.error(error.message)
    }
};

export const addEquipment = async (req, res) => {
    try {
        const addData = req.body;
        const toBeAddedData = new Equipment ({
           name:addData.name,
           type:addData.type,
           status:addData.status,
           lastCleanedDate:addData.lastCleanedDate
        })
        await toBeAddedData.save();

        res.status(200).json({message:"addEquipment is added successfully"})
        
    } catch (error) {
        console.error(error.message)
    }
};

export const updateEquipment = async (req, res) => {
    try {
        const getUpdateParamsId = req.params.id;
        const toBeUpdateData = req.body;

        const updated = await Equipment.findByIdAndUpdate(getUpdateParamsId,toBeUpdateData,{ new: true })
        
        res.status(201).json({message:"updated successfully",updated})
        
    } catch (error) {
        console.error(error.message)
    }
};

export const deleteEquipment = async (req, res) => {
    try {
        const getDeleteParamsId = req.params.id;
        await Equipment.findByIdAndDelete(req.params.id);
        res.json({ message: "Equipment deleted" });
    } catch (error) {
        console.error(error.message)
    }
};