import express from 'express';

import {
  pageCreate,
  pagesList,
  pageView,
  editPage,
  deletePageRecord,
  deleteTextResource,
} from '../controllers';

const router = express.Router();

router.post('/', pageCreate);
router.get('/', pagesList);
router.get('/:id', pageView);
router.put('/:id', editPage);
router.delete('/textResource/:id', deleteTextResource);
router.delete('/:id', deletePageRecord);

export default router;
