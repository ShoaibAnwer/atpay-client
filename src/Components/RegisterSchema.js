import * as Yup from "yup";
export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required e.g. Jon"),
  lastName: Yup.string().required("Last Name is required e.g. Vick"),
  email: Yup.string()
    .email("Email is not correct")
    .required("Email is required  e.g. JonVick@email.com"),
  contactNumber: Yup.string().required(
    "Contact Number is required e.g e.g. +923001231234"
  ),
  dob: Yup.string().required("Date Of Brith is required e.g yyyy-mm-dd"),
  password: Yup.string()
    .required("password is required e.g Test12345@")
    .min(8, "Password length must be 8 charater")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Conform Password is required"),
});
