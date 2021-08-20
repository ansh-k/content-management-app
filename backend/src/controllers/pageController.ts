import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { PageModel, TextResourcesModel } from '../models';

/*
------------------------
    API to create pages
-----------------------
*/

const pageCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { textResources } = body;

  try {
    const page = await PageModel.create(body);
    if (page && page._id) {
      var data = JSON.parse(textResources);
      if (data && data.length > 0) {
        data = data.map((item: any) => ({ ...item, pageID: page._id }));
        await TextResourcesModel.insertMany(data);
      }
      res.send({ page: page, success: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: err });
  }
};

/*
---------------------------
    API to get pages list
--------------------------
*/
const pagesList = async (req: Request, res: Response, next: NextFunction) => {
  // const { body } = req;
  // const { name, url, description, image } = body;

  try {
    const page = await PageModel.aggregate([
      {
        $lookup: {
          from: 'textresources', // collection name in db
          localField: '_id',
          foreignField: 'pageID',
          as: 'textResources',
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.send({ data: page, success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: err });
  }
};

/*
--------------------------------
    API to get page data by id
-------------------------------
*/
const pageView = async (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;
  const { id } = params;

  try {
    const page = await PageModel.aggregate([
      {
        $match: {
          _id: Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'textresources', // collection name in db
          localField: '_id',
          foreignField: 'pageID',
          as: 'textResources',
        },
      },
    ]);
    res.send({ data: page[0], success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: err });
  }
};

/*
------------------------
    API to edit pages
-----------------------
*/

const editPage = async (req: Request, res: Response, next: NextFunction) => {
  const { body, params } = req;
  const { textResources, name, url, description, image } = body;
  const { id } = params;

  try {
    const page = await PageModel.updateOne(
      {
        _id: Types.ObjectId(id),
      },
      {
        name,
        url,
        description,
        image,
      }
    );

    if (page && id) {
      var data = JSON.parse(textResources);
      if (data && data.length > 0) {
        var updates = data.map(async (item: any) => {
          if (item._id) {
            return await TextResourcesModel.updateOne(
              { _id: item._id },
              { ...item }
            );
          } else {
            return await TextResourcesModel.create({ ...item, pageID: id });
          }
        });
        Promise.all(updates);
      }
      res.send({ page: page, success: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: err });
  }
};

/*
------------------------------
    API to delete page record
------------------------------
*/

const deletePageRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const { id } = params;

  try {
    await PageModel.findByIdAndRemove(id);
    await TextResourcesModel.remove({ pageID: Types.ObjectId(id) });
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: err });
  }
};

/*
--------------------------------
    API to delete text resource
--------------------------------
*/

const deleteTextResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const { id } = params;

  try {
    await TextResourcesModel.findByIdAndRemove(id);
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: err });
  }
};

export {
  pageCreate,
  pagesList,
  pageView,
  editPage,
  deletePageRecord,
  deleteTextResource,
};
