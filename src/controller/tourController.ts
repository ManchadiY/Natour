import { Request, Response } from "express";
import Tour from "../models/tourModel";

function smartParse(value: any) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (!isNaN(value) && value.trim() !== "") return Number(value);
  return value;
}

function convert(obj: any) {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      convert(obj[key]);
    } else {
      obj[key] = smartParse(obj[key]);
    }
  }
}

async function getTours(req: Request, res: Response) {
  try {
    //copy of req.query
    const queryobj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];

    //loop through the excludedfields
    excludedFields.forEach((el) => delete queryobj[el]);
    console.log(req.query, queryobj);

    //advance filtering
    // advanced filtering
    let queryStr = JSON.stringify(queryobj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let newstr = JSON.parse(queryStr);

    convert(newstr);
    console.log("newstr", newstr);

    // let newQueryobj: any = {};
    // for (let key in req.query) {
    //   if (!excludedFields.includes(key)) {
    //     newQueryobj[key] = req.query[key];
    //   }
    // }
    // console.log(req.query, queryobj, newQueryobj);

    // filter using the filter object
    // const tours = await Tour.find({ duration: 5, difficulty: "easy" });
    // {difficulty:"easy" ,duration:{$gte : 5}}
    // { duration: { gte: '2' }, difficulty: 'easy' } req.query we got
    // const query = Tour.find({ duration: 5, difficulty: "easy" });
    let query = Tour.find(newstr);

    //2 sorting
    if (req.query.sort) {
      // if multiple sort
      let sortfilter: any = req.query.sort;
      let sortobj = sortfilter.split(",").join(" ");
      // console.log("sort obj", sortobj);

      query = query.sort(sortobj);
      // sort('price rating')
    } else {
      query = query.sort("-createdAt");
    }

    const tours = await query;
    // if we want to chain the methods , we have not await only await if want final result

    //using mongoose methods
    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");
    // console.log(tours);

    res.status(200).json({
      status: "success",
      data: {
        totalResults: tours.length,
        results: tours,
      },
    });
  } catch (error) {}
}

export { getTours };
