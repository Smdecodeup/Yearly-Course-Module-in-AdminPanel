var MODULE = require('/home/decodeup/Desktop/api/model/module.js')

exports.createModule = async function (req, res, next) {
    try {
        console.log('jay');
        const createModule = await MODULE.create({...req.body, user: req.userId})
        let data = await MODULE.findById(createModule._id).populate('user')
        return res.status(200).json({ Status: true, message: "create event Sucessfully", data });
    }
    catch (error) {
        return res.status(500).json({ Status: false, message: error.message });
    }
};
exports.listingModule = async function (req, res, next) {
    try {
        const data = await MODULE.find()
        return res.status(200).json({ Status: true, message: "all module listing Sucessfully",data })
    }
    catch (error) {
        return res.status(500).json({ Status: false, message: error.message });
    }
};
exports.viewModule = async function(req,res){
    try {
        var moduleId = req.query.moduleId
        
        const data = await MODULE.findById(moduleId)
        return res.status(200).json({ Status: true, message: "viewModule Sucessfully",data })
    } catch (error) {
        return res.status(500).json({ Status: false, message: error.message });
    }
}
exports.editModule = async function (req, res, next) {
    try {
        var editModuleId = req.query.editModuleId
        const editModule = await MODULE.findByIdAndUpdate(editModuleId,{
            moduleName :req.body.moduleName,
            moduleDescription:req.body.moduleDescription
        })
        console.log(editModule);
        return res.status(200).json({ Status: true, message: "editModule Sucessfully",editModule })
    }
    catch (error) {
        return res.status(500).json({ Status: false, message: error.message });
    }
};
exports.deleteModule = async function (req, res, next) {
    try {
        var moduleId = req.query.moduleId
        console.log(moduleId);
        const deleteModule = await MODULE.findByIdAndDelete(moduleId)
        console.log(deleteModule);
        return res.status(200).json({ Status: true, message: "deleteModule Sucessfully",deleteModule })
    }
    catch (error) {
        return res.status(500).json({ Status: false, message: error.message });
    }
};

