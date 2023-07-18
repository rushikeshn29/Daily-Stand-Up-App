import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



export const registration= Yup.object({
    firstName: Yup.string().min(4).max(20).required("Please enter your First name"),
    lastName: Yup.string().min(4).max(20).required("Please enter your Last name"),
    email: Yup.string().email().required("Please enter your email"),
    employeeId:  Yup.number().min(4).required("Please enter your employee Id"),
    teamLeadId:  Yup.string().required("Please enter your Team lead"),
    department:  Yup.string().required("Please select your department"),
    password: Yup.string().min(6).required("Please enter your password") ,
    confirmpassword: Yup.string()
    .required("Please enter same password ")
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    contact: Yup.string().required("Please enter phone number").matches(phoneRegExp, 'Phone number is not valid'),
    // profileImage: Yup.object().required("Please add a profile picture"),
   });



export const login = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password") ,
   
   });

   
export const employeeValidationSchema = Yup.object().shape({
    workingStatus: Yup.string().required("Current status is required"),
    attendance: Yup.string().required("Attendance is required"),
    updates: Yup.string().when("attendance", {
      is: "Present",
      then: Yup.string().required("Today's update is required"),
      otherwise: Yup.string()
    }),
    workingFrom: Yup.string().required("Working from is required"),
    workingOnClientName: Yup.string().when("workingStatus", {
      is: (value) => value === "Client" || value === "Shadow",
      then: Yup.string().required("Working on client name is required"),
      otherwise: Yup.string()
    })
  });
