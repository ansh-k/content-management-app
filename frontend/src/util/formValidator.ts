import { IAddEditInputsProps, ITextResourceInputs } from '../interfaces';
import { validURLRegex } from './constant';

/*
----------------------------------------
  Function to validate add/edit page form
-----------------------------------------
 */
const addPageValidationFunc = (inputs: IAddEditInputsProps) => {
  const { name = '', url = '', description = '', image = '' } = inputs;
  var validForm = false;
  let validName = (() => {
    if (name.length > 1 && name.trim() !== '') {
      return true;
    }
    return false;
  })();

  let validURL = (() => {
    let testURL = validURLRegex.test(url);
    if (testURL && url.trim() !== '') {
      return true;
    }
    return false;
  })();

  let validDesc = (() => {
    if (description.length > 1 && description.trim() !== '') {
      return true;
    }
    return false;
  })();

  let validImage = (() => {
    if (image.length > 1 && image !== '') {
      return true;
    }
    return false;
  })();

  if (validName && validURL && validDesc && validImage) {
    validForm = true;
  }

  return {
    validName,
    validURL,
    validDesc,
    validImage,
    validForm,
  };
};

/*
-----------------------------------------------------
  Function to validate add/edit text resources form
-----------------------------------------------------
 */
const addTextResourceValidationFunc = (
  textResourceInputs: ITextResourceInputs
) => {
  const {
    name = '',
    value = '',
    type = '',
    maxLength = '',
    lineType = '',
  } = textResourceInputs;

  var validForm = false;
  let validName = (() => {
    if (name.length > 1 && name.trim() !== '') {
      return true;
    }
    return false;
  })();

  let validValue = (() => {
    if (value.length > 1 && value.trim() !== '') {
      return true;
    }
    return false;
  })();

  let validType = (() => {
    if (type.length > 1 && type.trim() !== '') {
      return true;
    }
    return false;
  })();

  let validMaxLength = (() => {
    if (maxLength.length > 1 && maxLength.trim() !== '') {
      return true;
    }
    return false;
  })();

  let validLineType = (() => {
    if (lineType.length > 1 && lineType !== '') {
      return true;
    }
    return false;
  })();
  if (validName && validValue && validType && validMaxLength && validLineType) {
    validForm = true;
  }

  return {
    validName,
    validValue,
    validType,
    validMaxLength,
    validLineType,
    validForm,
  };
};
export { addPageValidationFunc, addTextResourceValidationFunc };
