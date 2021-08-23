import { PageModel, TextResourcesModel } from '../models';
import pagesSeed from './../util/pageSeedData.json';

const addPages = async () => {
  PageModel.find({}).then((pages) => {
    if (pages.length > 0) {
      console.log('Pages already exist');
      return;
    }

    var updates = pagesSeed.map(async (item: any) => {
      return await PageModel.create(item).then(async (page) => {
        // pages seed
        if (page && page._id) {
          const data = item.textResources.map((textItem: any) => ({
            ...textItem,
            pageID: page._id,
          }));
          await TextResourcesModel.insertMany(data); // their text resource seed
        }
      });
    });
    Promise.all(updates);
    console.log('Pages created successfully');
  });
};

export { addPages };
