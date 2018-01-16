import { assign } from 'lodash';

export const isRequired = (str = '') => {
  if (str !== null) {
    return (!(str.trim().length === 0));
  }
  return false;
};

export const isPositive = (num = '') => {
  return /^\d+$/.test(num);
};

export const isEmail = (str = '') => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);

export const isNumeric = (num) => (!num || (!isNaN(parseInt((num), 10)) && isFinite(num)));

const PasswordLimitations = (password = '') => {
  return password.length >= 8;

}
export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (error) {
    return false;
  }
  return true;
};

export const validateField = (formField) => {
  const rules = formField.rules;
  if (!!rules) {
    const fieldValue = formField.value;
    const updatedFormField = Object.assign({}, formField);

    for (let index = 0; index < rules.length; index += 1) {
      switch (rules[index]) {
        case 'isRequired':
          updatedFormField.status = isRequired(String(fieldValue));
          updatedFormField.errorText = 'Required';
          break;
        case 'PasswordLimitations':
          updatedFormField.status = PasswordLimitations(String(fieldValue));
          updatedFormField.errorText = 'Password should be greater or equal to 8 letters';
          break;
        case 'isEmail':
          updatedFormField.status = isEmail(fieldValue);
          updatedFormField.errorText = 'Invalid Email Address';
          break;
        case 'isPositive':
          updatedFormField.status = isPositive(fieldValue);
          updatedFormField.errorText = 'Must be Positive';
          break;
        case 'isNumber':
          updatedFormField.status = isNumeric(fieldValue);
          updatedFormField.errorText = 'Must be Numeric';
          break;
        default:
      }
      if (!updatedFormField.status) {
        break;
      }
    }
    return updatedFormField;
  }

  return formField;
};

export const validateFormData = (formData) => {
  let validateFlag = true;
  let updatedFormData = assign({}, formData);

  Object.keys(formData).map((fieldKey) => {
    const formField = formData[fieldKey];
    if (formField.hasOwnProperty('status') && formField.hasOwnProperty('value')) {
      const updatedFormField = validateField(formField);
      updatedFormData = assign(updatedFormData, { [fieldKey]: updatedFormField });
      validateFlag = !!updatedFormField.status && validateFlag;
    } else {
      const result = validateFormData(formField);
      updatedFormData = assign(updatedFormData, { [fieldKey]: result.updatedFormData });
      validateFlag = !!result.validateFlag && validateFlag;
    }
  });

  return { validateFlag: !!validateFlag, updatedFormData };
};
