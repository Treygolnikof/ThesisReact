import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  username: Yup.string()
    .min(2, "Must be longer than 2 characters")
    .max(20, "Nice try, nobody has a first name that long")
    .required("Required"),
  message: Yup.string()
    .required("Required")
});
export default FormSchema;