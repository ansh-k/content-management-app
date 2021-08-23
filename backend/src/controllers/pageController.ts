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
  const { query } = req;
  const { search = '', page = 1, _limit } = query || {};
  const _page: any = page || 1;
  const limit: any = _limit || 10;

  const skipValue = (parseInt(_page) - 1) * parseInt(limit);
  try {
    let condition: any = {};
    if (search) {
      condition = {
        name: new RegExp('^' + search + '$', 'i'),
      };
    }
    const data = await PageModel.aggregate([
      {
        $match: condition,
      },
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
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: skipValue }, { $limit: parseInt(limit) }], // add projection here wish you re-shape the docs
        },
      },
    ]);

    res.send({ data: data[0], success: true });
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
