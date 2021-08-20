import { NextFunction, Request, Response } from 'express';
import { PageModel, TextResourcesModel } from '../models';

/*
------------------------
    API to create pages
-----------------------
*/

const create = async (req: Request, res: Response, next: NextFunction) => {
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
const list = async (req: Request, res: Response, next: NextFunction) => {
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

export { create, list };
