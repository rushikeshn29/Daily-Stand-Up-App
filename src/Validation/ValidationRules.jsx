import * as Yup from "yup";



export const registration= Yup.object({
    fname: Yup.string().min(4).max(20).required("Please enter your First name"),
    lname: Yup.string().min(4).max(20).required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password") ,
    confirmpassword: Yup.string()
    .required("Please enter same password ")
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    role: Yup.string().required("Please select your role")
   });



export const login = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password") ,
   
   });

