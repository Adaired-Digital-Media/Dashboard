// import { CustomCellInterFaceProp, RowCreateCallBackData } from "@/Types/TableType";

// export const RowCreateCallData = ["For each row that is generated for display, the createdRow function is called once and once only. It is passed the create row node which can then be modified.", "the 'salary' column Primary and bold by adding a CSS class to the container cell if the salary is greater than $150,000.", "the 'salary' column danger and bold by adding a CSS class to the container cell if the salary is less than $40,000."];

// export const RowCreateCallList = [
//   {
//     name: "Angelica Ramos",
//     email: "Angelica@gmail.com",
//     experience: "4 Month",
//     sex: "Female",
//     contactNumber: "+91 8745963210",
//     salary: 1200000,
//   },
//   {
//     name: "Bradley Greer",
//     email: "Bradley@gmail.com",
//     experience: "6 Year",
//     sex: "Male",
//     contactNumber: "+91 8794561230",
//     salary: 132000,
//   },
//   {
//     name: "Brenden Wagner",
//     email: "Brenden@gmail.com",
//     experience: "2 Year",
//     sex: "Female",
//     contactNumber: "+91 6589742301",
//     salary: 132000,
//   },
//   {
//     name: "Caesar Vance",
//     email: "Vance@yahoo.com",
//     experience: "1 Year",
//     sex: "Male",
//     contactNumber: "+91 8596741230",
//     salary: 206850,
//   },
//   {
//     name: "Dai Rios",
//     email: "Rios@gmail.com",
//     experience: "1 Year",
//     sex: "Male",
//     contactNumber: "+91 7418529630",
//     salary: 217500,
//   },
//   {
//     name: "Doris Wilder",
//     email: "Wilder@gmail.com",
//     experience: "6 Month",
//     sex: "Male",
//     contactNumber: "+91 6541239870",
//     salary: 85600,
//   },
//   {
//     name: "Elana Robbert	",
//     email: "ElanaRob@gmail.com	",
//     experience: "1 Year	",
//     sex: "Male	",
//     contactNumber: "+91 9789887777",
//     salary: 28000,
//   },
//   {
//     name: "Fiona Green",
//     email: "Fiona@yahoo.com",
//     experience: "3 Month",
//     sex: "Female",
//     contactNumber: "+91 6985321470",
//     salary: 850000,
//   },
//   {
//     name: "Gavin Cortez",
//     email: "Gavin@gmail.com",
//     experience: "9 Year",
//     sex: "Male",
//     contactNumber: "+91 748521369",
//     salary: 232500,
//   },
//   {
//     name: "Gavin Joyce",
//     email: "Gavin@yahoo.com",
//     experience: "8 Month",
//     sex: "Male",
//     contactNumber: "+91 8596741230",
//     salary: 235500,
//   },
//   {
//     name: "Genelia Ottre	",
//     email: "Genelia@gmail.com",
//     experience: "2 Days",
//     sex: "Male",
//     contactNumber: "+91 8794562135",
//     salary: 92575,
//   },
//   {
//     name: "Gloria Little",
//     email: "Gloria@yahoo.com",
//     experience: "4 Year",
//     sex: "Male",
//     contactNumber: "+91 9876541230",
//     salary: 24120,
//   },
//   {
//     name: "Jenette Caldwell",
//     email: "Jenette@yahoo.com",
//     experience: "2 Year",
//     sex: "Female",
//     contactNumber: "+91 4569871230",
//     salary: 237500,
//   },
//   {
//     name: "Jennifer Chang",
//     email: "Jennifer@yahoo.com",
//     experience: "1 Year",
//     sex: "Female",
//     contactNumber: "+91 7412589630",
//     salary: 345000,
//   },
//   {
//     name: "Michael Silva",
//     email: "Michael@yahoo.com",
//     experience: "3 Year",
//     sex: "Female",
//     contactNumber: "+91 1234567891",
//     salary: 357650,
//   },
//   {
//     name: "Michelle House",
//     email: "Michelle@gmail.com",
//     experience: "1 Year",
//     sex: "Male",
//     contactNumber: "+91 8745961235",
//     salary: 198500,
//   },
//   {
//     name: "Paul Byrd",
//     email: "Paul@gmail.com",
//     experience: "2 Day",
//     sex: "Male",
//     contactNumber: "+91 3124567894",
//     salary: 95400,
//   },
//   {
//     name: "Prescott Bartlett",
//     email: "Prescott@gmail.com",
//     experience: "8 Year",
//     sex: "Male",
//     contactNumber: "+91 4578961231",
//     salary: 725000,
//   },
//   {
//     name: "Shou Itou",
//     email: "Shou@gmail.com",
//     experience: "2 Year",
//     sex: "Female",
//     contactNumber: "+91 3256897414",
//     salary: 145000,
//   },
//   {
//     name: "Stiphen Deo",
//     email: "Stiphen@yahoo.com",
//     experience: "6 Month",
//     sex: "Female",
//     contactNumber: "+91 9874563210",
//     salary: 163000,
//   },
//   {
//     name: "Suki Burks",
//     email: "Burks@gmail.com",
//     experience: "3 Year",
//     sex: "Female",
//     contactNumber: "+91 4785961230",
//     salary: 22000,
//   },
//   {
//     name: "Yuri Berry",
//     email: "Berry@gmail.com",
//     experience: "3 Year",
//     sex: "Female",
//     contactNumber: "+91 7894561230",
//     salary: 114500,
//   },
// ];

// const CustomCell: React.FC<CustomCellInterFaceProp> = ({ value }) => {
//   return <span className={`${value < 40000 ? "text-danger fw-bold" : ""} ${value > 15000 ? "highlight" : ""}`}>${value}</span>;
// };

// export const RowCreateCallColumn = [
//   {
//     name: "Name",
//     selector: (row: RowCreateCallBackData) => row["name"],
//     sortable: true,
//   },
//   {
//     name: "Symbol",
//     selector: (row: RowCreateCallBackData) => `${row.email}`,
//     sortable: true,
//   },
//   {
//     name: "Price",
//     selector: (row: RowCreateCallBackData) => `${row.experience}`,
//     sortable: true,
//   },
//   {
//     name: "Sex",
//     cell: (row: RowCreateCallBackData) => row.sex,
//     sortable: true,
//   },
//   {
//     name: "Contact Number",
//     cell: (row: RowCreateCallBackData) => row.contactNumber,
//     sortable: true,
//   },
//   {
//     name: "Salary",
//     cell: (row: RowCreateCallBackData) => <CustomCell value={row.salary} />,
//     sortable: true,
//   },
// ];
