import Equipment from "../models/equipment.model.js";

export const getEquipment = async (req, res) => {
    try {
        const search = req.query.search || '';
        const page= parseInt(req.query.page) || 1;
        const skip = (page-1)*5;
        const query = {
            $or:[
                {name:{$regex:search,$options:'i'}},
                {type:{$regex:search,$options:'i'}},
                {status:{$regex:search,$options:'i'}}
            ]
        }

        const total = await Equipment.countDocuments(query);
         const getEquipmentData = await Equipment.find(query).skip(skip).limit(5);
         res.status(200).json({getEquipmentData,page,skip,total,totalpage:Math.ceil(total/5)});
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