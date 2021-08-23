const ADD_NEW_PAGE = '/add-new';
const EDIT_PAGE = '/edit/:id';
const VIEW_PAGE = 'view/:id';
const validURLRegex = new RegExp( // eslint-disable-next-line
  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/
);

export { ADD_NEW_PAGE, EDIT_PAGE, VIEW_PAGE, validURLRegex };
