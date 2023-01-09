export const validateEntry = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "name is required!";
  }
  if (!values.quantity) {
    errors.quantity = "quantity is required!";
  }
  if (!values.category) {
    errors.category = "category is required!";
  }
  return errors;
};
