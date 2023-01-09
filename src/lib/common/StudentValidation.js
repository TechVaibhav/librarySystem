export const validateStudent = (values) => {
  const error = {};
  if (!values.student_name) {
    error.student_name = "student_name is required!";
  }
  if (!values.student_Id) {
    error.student_Id = "student_Id is required!";
  }
  return error;
};
