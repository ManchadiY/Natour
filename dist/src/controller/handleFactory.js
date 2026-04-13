"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getOne = getOne;
exports.createOne = createOne;
exports.UpdateOne = UpdateOne;
exports.deleteOne = deleteOne;
const appErro_1 = __importDefault(require("../utils/appErro"));
const catAsync_1 = __importDefault(require("../utils/catAsync"));
//updateOne,deleteOne,getAll,createOne,getOne
function getOne(Model, populateOptions) {
    // model is name of the model we want to get information from
    return (0, catAsync_1.default)(async (req, res, next) => {
        // create  a query
        let query = Model.findById(req.params.id);
        console.log(req.params);
        // check for options to populate
        if (populateOptions)
            query = query.populate(populateOptions);
        // call the query
        let doc = await query;
        //send the response
        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });
}
function getAll(Model) {
    // model is name of the model we want to get information from
    return (0, catAsync_1.default)(async (req, res, next) => {
        // create  a query, apply the filters too
        let query = Model.find();
        // call the query
        let doc = await query;
        //send the response
        res.status(200).json({
            status: "success",
            results: doc.length,
            data: {
                data: doc,
            },
        });
    });
}
function createOne(Model) {
    return (0, catAsync_1.default)(async (req, res, next) => {
        let doc = await Model.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });
}
function UpdateOne(Model) {
    return (0, catAsync_1.default)(async (req, res, next) => {
        let doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!doc) {
            return next(new appErro_1.default(`no document found for this id ${req.params.id}`, 404));
        }
        // send response
        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });
}
function deleteOne(Model) {
    return (0, catAsync_1.default)(async (req, res, next) => {
        let doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return next(new appErro_1.default(`no document found for this id ${req.params.id}`, 404));
        }
        // send response
        res.status(204).json({
            status: "success",
        });
    });
}
// function updateOne(model) {}
