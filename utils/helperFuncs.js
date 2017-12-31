
import { find, assign, filter, forOwn, lowerCase } from 'lodash';
import { isNumeric } from 'utils/validations';


export const submitFormData = (formData) => {
  let newFormData = {};
  if (!!formData) {
    Object.keys(formData).forEach((fieldKey) => {
      const formField = formData[fieldKey];
      if (formField.hasOwnProperty('status') && formField.hasOwnProperty('value')) {
        if (formField.value === 0 || formField.value === false || !!formField.value) {
          if (fieldKey === 'manufacturers' && !Array.isArray(formField.value)) {
            newFormData[fieldKey] = formField.value.split(',');
          } else {
            newFormData[fieldKey] = formField.value;
          }
        }
      } else {
        const result = submitFormData(formField);
        if (Object.keys(result).length > 0) {
          newFormData = assign(newFormData, { [fieldKey]: result });
        }
      }
    });
  }

  return newFormData;
};

