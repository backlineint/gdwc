const validateElement = elementName => {
  const regex = new RegExp('^[a-z0-9-]+$');
  return regex.test(elementName)
    ? regex.test(elementName)
    : 'Element name must be lowercase alphanumeric with optional dashes';
};

module.exports = [
  {
    type: 'input',
    name: 'elementName',
    message: `Enter element name. (e.g. 'my-element'):`,
    validate: validateElement,
  },
  {
    type: 'input',
    name: 'description',
    message: `Enter element description:`,
  },
];
