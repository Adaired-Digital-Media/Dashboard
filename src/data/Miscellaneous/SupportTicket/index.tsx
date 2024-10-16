// import { ImagePath } from "@/Constant";
// import { ImageDataProp, SkillsDataProp, SupportDataType } from "@/Types/SupportTicketType";
// import { Progress } from "reactstrap";

// export const SupportData = [
//   {
//     text: "List of ticket opend by customers",
//   },
// ];

// export const TicketData = [
//   {
//     id: 1,
//     title: "Order",
//     num: 2563,
//     class: "bg-primary",
//   },
//   {
//     id: 2,
//     title: "Pending",
//     num: 8943,
//     class: "bg-secondary",
//   },
//   {
//     id: 3,
//     title: "Running",
//     num: 2500,
//     class: "bg-warning",
//   },
//   {
//     id: 4,
//     title: "Smooth",
//     num: 2060,
//     class: "bg-info",
//   },
//   {
//     id: 5,
//     title: "Done",
//     num: 5600,
//     class: "bg-success",
//   },
//   {
//     id: 6,
//     title: "Cancel",
//     num: 2560,
//     class: "bg-danger",
//   },
// ];

// export const SupportTicketData = [
//   {
//     id: 1,
//     image:"user/5.jpg",
//     name: "Airi Satou",
//     position: "Accountant",
//     salary: "$162,700",
//     office: "Tokyo",
//     skill: 100,
//     skillColor: "info",
//     extn: 5407,
//     email: "a.satou@datatables.net",
//     experience: "1 Year",
//   },
//   {
//     id: 2,
//     image:"user/7.jpg",
//     name: "Ashton Cox",
//     position: "Junior Technical Author",
//     salary: "$86,000",
//     office: "San Francisco",
//     skill: 60,
//     skillColor: "danger",
//     extn: 1562,
//     email: "a.cox@datatables.net",
//     experience: "1 Year",
//   },
//   {
//     id: 3,
//     image:"user/6.jpg",
//     name: "Bradley Greer",
//     position: "Software Engineer",
//     salary: "$132,000",
//     office: "London",
//     skill: 30,
//     skillColor: "primary",
//     extn: 2558,
//     email: "b.greer@datatables.net",
//     experience: "4 Year",
//   },
//   {
//     id: 4,
//     image:"user/11.png",
//     name: "Brielle Williamson",
//     position: "Integration Specialist",
//     salary: "$372,000",
//     office: "New York",
//     skill: 55,
//     skillColor: "info",
//     extn: 4804,
//     email: "b.williamson@datatables.net",
//     experience: "2 Months",
//   },
//   {
//     id: 5,
//     image:"user/4.jpg",
//     name: "Caesar Vance",
//     position: "Pre-Sales Support",
//     salary: "$106,450",
//     office: "New York",
//     skill: 20,
//     skillColor: "success",
//     extn: 8330,
//     email: "c.vance@datatables.net",
//     experience: "5 Years",
//   },
//   {
//     id: 6,
//     image:"user/1.jpg",
//     name: "Cedric Kelly",
//     position: "Senior Javascript Developer",
//     salary: "$433,060",
//     office: "Edinburgh",
//     skill: 50,
//     skillColor: "success",
//     extn: 6224,
//     email: "c.kelly@datatables.net",
//     experience: "1 Year",
//   },
//   {
//     id: 7,
//     image:"user/9.jpg",
//     name: "Charde Marshall",
//     position: "Regional Director	",
//     salary: "$470,600",
//     office: "San Francisco",
//     skill: 80,
//     skillColor: "secondary",
//     extn: 6741,
//     email: "c.marshall@datatables.net",
//     experience: "3 Year",
//   },
//   {
//     id: 8,
//     image:"user/8.jpg",
//     name: "Colleen Hurst",
//     position: "Javascript Developer",
//     salary: "$205,500",
//     office: "San Francisco",
//     skill: 100,
//     skillColor: "info",
//     extn: 6224,
//     email: "c.hurst@datatables.net",
//     experience: "2 Year",
//   },
//   {
//     id: 9,
//     image:"user/2.jpg",
//     name: "Dai Rios",
//     position: "Personnel Lead",
//     salary: "$217,500",
//     office: "Edinburgh",
//     skill: 24,
//     skillColor: "success",
//     extn: 2290,
//     email: "d.rios@datatables.net",
//     experience: "4 Year",
//   },
//   {
//     id: 10,
//     image:"user/11.png",
//     name: "Garrett Winters",
//     position: "Accountant",
//     salary: "$170,750",
//     office: "Tokyo",
//     skill: 40,
//     skillColor: "warning",
//     extn: 8422,
//     email: "g.winters@datatables.net",
//     experience: "1 Year",
//   },
//   {
//     id: 11,
//     image:"user/6.jpg",
//     name: "Gloria Little",
//     position: "Systems Administrator",
//     salary: "$237,500",
//     office: "New York",
//     skill: 40,
//     skillColor: "secondary",
//     extn: 1721,
//     email: "g.little@datatables.net",
//     experience: "4 Year",
//   },
//   {
//     id: 12,
//     image:"user/2.jpg",
//     name: "Haley Kennedy",
//     position: "Senior Marketing Designer",
//     salary: "$313,500",
//     office: "London",
//     skill: 15,
//     skillColor: "success",
//     extn: 3597,
//     email: "h.kennedy@datatables.net",
//     experience: "3 Year",
//   },
//   {
//     id: 13,
//     image:"user/7.jpg",
//     name: "Herrod Chandler",
//     position: "Sales Assistant",
//     salary: "$137,500",
//     office: "San Francisco",
//     skill: 50,
//     skillColor: "success",
//     extn: 9608,
//     email: "h.chandler@datatables.net",
//     experience: "2 Year",
//   },
//   {
//     id: 14,
//     image:"user/11.png",
//     name: "Jena Gaines",
//     position: "Office Manager",
//     salary: "$90,560",
//     office: "London",
//     skill: 80,
//     skillColor: "warning",
//     extn: 3814,
//     email: "j.gaines@datatables.net",
//     experience: "2 Year",
//   },
//   {
//     id: 15,
//     image:"user/9.jpg",
//     name: "Jenette Caldwell",
//     position: "Development Lead",
//     salary: "$345,000",
//     office: "New York",
//     skill: 80,
//     skillColor: "warning",
//     extn: 1937,
//     email: "j.caldwell@datatables.net",
//     experience: "4 Year",
//   },
//   {
//     id: 16,
//     image:"user/4.jpg",
//     name: "Michael Silva",
//     position: "Marketing Designer",
//     salary: "$198,500",
//     office: "London",
//     skill: 20,
//     skillColor: "primary",
//     extn: 1581,
//     email: "m.silva@datatables.net",
//     experience: "3 Year",
//   },
//   {
//     id: 17,
//     image:"user/5.jpg",
//     name: "Paul Byrd",
//     position: "Chief Financial Officer (CFO)",
//     salary: "$725,000",
//     office: "New York",
//     skill: 20,
//     skillColor: "primary",
//     extn: 3059,
//     email: "p.byrd@datatables.net",
//     experience: "4 Year",
//   },
//   {
//     id: 18,
//     image:"user/5.jpg",
//     name: "Quinn Flynn",
//     position: "Support Lead",
//     salary: "$342,000",
//     office: "Edinburgh",
//     skill: 10,
//     skillColor: "success",
//     extn: 9497,
//     email: "q.flynn@datatables.net",
//     experience: "3 Year",
//   },
//   {
//     id: 19,
//     image:"user/8.jpg",
//     name: "Rhona Davidson",
//     position: "Integration Specialist",
//     salary: "$327,900",
//     office: "Tokyo",
//     skill: 10,
//     skillColor: "success",
//     extn: 6200,
//     email: "r.davidson@datatables.net",
//     experience: "2 Year",
//   },
//   {
//     id: 20,
//     image:"user/10.jpg",
//     name: "Sonya Frost",
//     position: "Software Engineer",
//     salary: "$103,600",
//     office: "Edinburgh",
//     skill: 10,
//     skillColor: "primary",
//     extn: 1667,
//     email: "s.frost@datatables.net",
//     experience: "2 Year",
//   },
//   {
//     id: 21,
//     image:"user/7.jpg",
//     name: "Tatyana Dens",
//     position: "Regional Director",
//     salary: "$385,750",
//     office: "London",
//     skill: 80,
//     skillColor: "primary",
//     extn: 1667,
//     email: "t.fitzpatrick@datatables.net",
//     experience: "3 Year",
//   },
//   {
//     id: 22,
//     image:"user/1.jpg",
//     name: "Tiger Nixon",
//     position: "System Architect",
//     salary: "$320,800",
//     office: "Edinburgh",
//     skill: 30,
//     skillColor: "primary",
//     extn: 5421,
//     email: "t.nixon@datatables.net",
//     experience: "1 Year",
//   },
//   {
//     id: 23,
//     image:"user/10.jpg",
//     name: "Yuri Berry",
//     position: "Chief Marketing Officer (CMO)",
//     salary: "$675,000",
//     office: "New York",
//     skill: 60,
//     skillColor: "danger",
//     extn: 6154,
//     email: "y.berry@datatables.net",
//     experience: "5 Year",
//   },
// ];

// const SkillsData:React.FC<SkillsDataProp> = ({ value, skillColor }) => {
//   return (
//       <div className="progress-showcase" style={{ width: "86px" }}>
//         <Progress className="sm-progress-bar" value={value} color={skillColor} />
//       </div>
//   );
// };

// const ImageData:React.FC<ImageDataProp> = ({ image, title }) => {
//   return (
//       <div className="d-flex">
//         <img className="rounded-circle img-30 me-3" src={`${ImagePath}/${image}`} alt="Generic placeholder image" />
//         <div className="flex-grow-1 align-self-center">
//           <div>{title}</div>
//         </div>
//       </div>
//   );
// };

// export const SupportColumnData = [
//   {
//     name: "Image",
//     cell: (row:SupportDataType) => <ImageData image={row.image} title={row.name}/>,
//     sortable: true,
//     center: false,
//   },
//   {
//     name: "Position",
//     selector: (row:SupportDataType) => row["position"],
//     sortable: true,
//     center: true,
//   },
//   {
//     name: "Salary",
//     selector: (row:SupportDataType) => row["salary"],
//     sortable: true,
//     center: true,
//   },
//   {
//     name: "Office",
//     selector: (row:SupportDataType) => row["office"],
//     sortable: true,
//     center: true,
//   },
//   {
//     name: "Skill",
//     cell: (row:SupportDataType) => <SkillsData value={row.skill} skillColor={row.skillColor} />,
//     sortable: true,
//     center: true,
//   },
//   {
//     name: "Extn",
//     selector: (row: SupportDataType) => row["extn"],
//     sortable: true,
//     center: true,
//   },
//   {
//     name: "Email",
//     selector: (row: SupportDataType) => row["email"],
//     sortable: true,
//     center: true,
//   },
// ];