export const validateIssueBook = (setvalues) => {
  const seterrors = {};
  if (!setvalues.student) {
    seterrors.student = "student name is required!";
  }
  if (!setvalues.category) {
    seterrors.category = "category is required!";
  }
  if (!setvalues.selectedBook) {
    seterrors.selectedBook = "selectedBook is required!";
  }
  return seterrors;
};
