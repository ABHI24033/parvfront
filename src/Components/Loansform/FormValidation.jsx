import * as yup from 'yup';

export const PersoanlLoanValidation = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    // mname: yup.string().notRequired("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    phone: yup.string().required("Phone is required").matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    alternate_number: yup.string().required(" is required").matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    dob: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    marital_status: yup.string().required("Marital Status is required"),
    spouse_name: yup.string(),
    father_name: yup.string().required("Father's Name is required"),
    mother_name: yup.string().required("Mother's Name is required"),
    house_name: yup.string().required("House Name is required"),
    street_name: yup.string().required("Street Name is required"),
    city_name: yup.string().required("City Name is required"),
    landmark: yup.string().required("Landmark is required"),
    district: yup.string().required("District is required"),
    state: yup.string().required("State is required"),
    pincode: yup.string().required("Pincode is required"),

    present_house_name: yup.string().required("House Name is required"),
    present_street_name: yup.string().required("First Name is required"),
    present_city_name: yup.string().required("First Name is required"),
    present_landmark: yup.string().required("First Name is required"),
    present_district: yup.string().required("First Name is required"),
    present_state: yup.string().required("First Name is required"),
    present_pincode: yup.number("Please Enter Number only").required("First Name is required"),

    co_name: yup.string().required("First Name is required"),
    co_date_of_birth: yup.string().required("First Name is required"),
    occupation: yup.string().required("First Name is required"),
    co_relation: yup.string().required("First Name is required"),
    // job details
    salary_slip: yup.string().required("First Name is required"),
    form16: yup.string().required("First Name is required"),
    job_experience: yup.string().required("First Name is required"),
    designation: yup.string().required("First Name is required"),
    current_salary: yup.string().required("First Name is required"),
    company_name: yup.string().required("First Name is required"),
    current_job_experience: yup.string().required("First Name is required"),
    office_building_name: yup.string().required("First Name is required"),
    office_street_name: yup.string().required("First Name is required"),
    office_city_name: yup.string().required("First Name is required"),
    office_landmark: yup.string().required("First Name is required"),
    office_district: yup.string().required("First Name is required"),
    office_state: yup.string().required("First Name is required"),
    office_pincode: yup.string().required("First Name is required"),

    // Documents
    // adhar_front: yup.mixed().required("Aadhaar front image is Required"),
    // adhar_back: yup.mixed().required("Aadhaar Back image is required"),
    // pancard: yup.mixed().required("Pan Card is required"),
    // applicant_photo: yup.mixed().required("Applicant is required"),
    // address_proof: yup.mixed().required("Address Proof is required"),
    // first_month_salary: yup.mixed().required("First Month Salary is required"),
    // second_month_salary: yup.mixed().required("Second Month Salary is required"),
    // third_month_salary: yup.mixed().required("Third Month Salary is required"),
    // itr1: yup.string().required("ITR-1 is required"),
    // itr2: yup.string().required("ITR-2 is required"),

    // // other1:yup.string().required(""),
    // // other2:yup.string().required(""),
    // // other3:yup.string().required(""),
    // co_adhar_front:yup.string().required("Co-Applicant Aadhar is required"),
    // co_adhar_back:yup.string().required("Co-Applicant Aadhar is required"),
    // co_pancard:yup.string().required("Co-Applicant Pan Card is required"),
    // co_applicant_photo:yup.string().required("Co-Applicant Photo is required"),

})
export const BusinessLoanValidation = yup.object().shape({
    fname: yup.string().required("Required field"),
    // mname: yup.string().notRequired("First Name is required"),
    lname: yup.string().required("Required field"),
    email: yup.string().email("Invalid Email").required("Required field"),
    phone: yup.string().required("Required field").matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    alternate_number: yup.string().required(" Required field").matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    dob: yup.string().required("Required field"),
    gender: yup.string().required("Required field"),
    marital_status: yup.string().required("Required field"),
    spouse_name: yup.string(),
    father_name: yup.string().required("Required field"),
    mother_name: yup.string().required("Required field"),
    house_name: yup.string().required("Required field"),
    street_name: yup.string().required("Required field"),
    city_name: yup.string().required("Required field"),
    landmark: yup.string().required("Required field"),
    district: yup.string().required("Required field"),
    state: yup.string().required("Required field"),
    pincode: yup.string().required("Required field"),
    present_house_name: yup.string().required("Required field"),
    present_street_name: yup.string().required("Required fields"),
    present_city_name: yup.string().required("Required fields"),
    present_landmark: yup.string().required("Required fields"),
    present_district: yup.string().required("Required fields"),
    present_state: yup.string().required("Required fields"),
    present_pincode: yup.string().required("Required fields"),
    //bank_details
    // bank_name:yup.string().required("Required field"),
    // account_type:yup.string().required("Required field"),
    //co_applicant
    co_name: yup.string().required("Required field"),
    co_date_of_birth: yup.string().required("Required field"),
    occupation: yup.string().required("Required field"),
    co_relation: yup.string().required("Required field"),
    // business details
    // loan_purpose: yup.string().required("Required fields"),
    // company_name: yup.string().required("Required fields"),
    // business_register_year:yup.string().required("Required fields"),
    // registration_documents: yup.string().required("Required fields"),
    // business_turnover: yup.string().required("Required fields"),
    // file_itr: yup.string().required("Required fields"),
    // property_mortgage: yup.string().required("Required fields"),
    // property_location: yup.string().required("Required fields"),
    // property_owner: yup.string().required("Required fields"),
    // property_documents:yup.string().required("Required fields"),
    // 

    // Documents
    // adhar_front: yup.mixed().required("Aadhaar front image is Required"),
    // adhar_back: yup.mixed().required("Aadhaar Back image is required"),
    // pancard: yup.mixed().required("Pan Card is required"),
    // applicant_photo: yup.mixed().required("Applicant is required"),
    // address_proof: yup.mixed().required("Address Proof is required"),
    // first_month_salary: yup.mixed().required("First Month Salary is required"),
    // second_month_salary: yup.mixed().required("Second Month Salary is required"),
    // third_month_salary: yup.mixed().required("Third Month Salary is required"),
    // itr1: yup.string().required("ITR-1 is required"),
    // itr2: yup.string().required("ITR-2 is required"),

    // // other1:yup.string().required(""),
    // // other2:yup.string().required(""),
    // // other3:yup.string().required(""),
    // co_adhar_front:yup.string().required("Co-Applicant Aadhar is required"),
    // co_adhar_back:yup.string().required("Co-Applicant Aadhar is required"),
    // co_pancard:yup.string().required("Co-Applicant Pan Card is required"),
    // co_applicant_photo:yup.string().required("Co-Applicant Photo is required"),

})
export const GoldLoanValidation = yup.object().shape({
    fname: yup.string().required("Required field"),
    // mname: yup.string().notRequired("First Name is required"),
    lname: yup.string().required("Required field"),
    email: yup.string().email("Invalid Email").required("Required field"),
    phone: yup.string().required("Required field").matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    alternate_number: yup.string().required(" Required field").matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    dob: yup.string().required("Required field"),
    gender: yup.string().required("Required field"),
    marital_status: yup.string().required("Required field"),
    spouse_name: yup.string(),
    father_name: yup.string().required("Required field"),
    mother_name: yup.string().required("Required field"),
    house_name: yup.string().required("Required field"),
    street_name: yup.string().required("Required field"),
    city_name: yup.string().required("Required field"),
    landmark: yup.string().required("Required field"),
    district: yup.string().required("Required field"),
    state: yup.string().required("Required field"),
    pincode: yup.string().required("Required field"),
    present_house_name: yup.string().required("Required field"),
    present_street_name: yup.string().required("Required fields"),
    present_city_name: yup.string().required("Required fields"),
    present_landmark: yup.string().required("Required fields"),
    present_district: yup.string().required("Required fields"),
    present_state: yup.string().required("Required fields"),
    present_pincode: yup.string().required("Required fields"),
    //bank_details
    

})