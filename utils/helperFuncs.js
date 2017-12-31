
import { assign } from 'lodash';

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



export const createRequestOptions = (requestMethod, requestBody = null, requestHeader = null) => {
  const options = {
    method: requestMethod,
    headers: assign({
      'Content-Type': 'application/json',
    }, requestHeader),
  };

  if (requestBody && (requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'PATCH')) {
    options.body = JSON.stringify(requestBody);
  }

  return options;
};
