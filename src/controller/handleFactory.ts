// file to create common crud operation for all models
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appErro";
import CatchAsync from "../utils/catAsync";

//updateOne,deleteOne,getAll,createOne,getOne

function getOne(Model: any, populateOptions?: any) {
  // model is name of the model we want to get information from
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // create  a query
    let query = Model.findById(req.params.id);
    console.log(req.params);

    // check for options to populate
    if (populateOptions) query = query.populate(populateOptions);
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

function getAll(Model: any) {
  // model is name of the model we want to get information from
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

function createOne(Model: any) {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
}

function UpdateOne(Model: any) {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(`no document found for this id ${req.params.id}`, 404),
      );
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

function deleteOne(Model: any) {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`no document found for this id ${req.params.id}`, 404),
      );
    }

    // send response
    res.status(204).json({
      status: "success",
    });
  });
}

export { getAll, getOne, createOne, UpdateOne, deleteOne };

// function updateOne(model) {}
