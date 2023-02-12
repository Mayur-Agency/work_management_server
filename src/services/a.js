// const uri =
//   "assemblies?completed=true&startdate=2022-01-01&enddate=2022-12-31&worker_id=054d43d8-6c59-4700-971a-8a72ed7dd04b";
// const queries = {
//   completed: true,
//   startDate: "2022-01-01",
//   endDate: "2022-12-31",
//   worker_id: "054d43d8-6c59-4700-971a-8a72ed7dd04b",
// };
// let whereClause = {};

// if (queries.startDate && queries.endDate) {
//   // convert the strings to dates
//   const { startDate, endDate } = queries;
//   const parsedStartDate = new Date(startDate);
//   const parsedEndDate = new Date(endDate);
//   whereClause.AND = [
//     { date_assigned: { gte: parsedStartDate } },
//     { date_completed: { lte: parsedEndDate } },
//   ];
// } else if (queries.startDate) {
//   const { startDate } = queries;
//   // convert the string to a date
//   const parsedStartDate = new Date(startDate);
//   whereClause.date_assigned = { gte: parsedStartDate };
// } else if (queries.endDate) {
//   const { endDate } = queries;

//   // convert the string to a date
//   const parsedEndDate = new Date(endDate);
//   whereClause.date_completed = { lte: parsedEndDate };
// }
// delete queries.startDate;
// delete queries.endDate;
// Object.entries(queries).map((entry) => {
//   whereClause[entry[0]] = entry[1];
// });
// console.log(whereClause);
const uri =
  "assemblies?completed=true&startdate=2022-01-01&enddate=2022-12-31&worker_id=054d43d8-6c59-4700-971a-8a72ed7dd04b";
const queries = {
  completed: true,
  startDate: "2022-01-01",
  // endDate: "2022-12-31",
  worker_id: "054d43d8-6c59-4700-971a-8a72ed7dd04b",
};

let whereClause = {};

const { startDate, endDate, ...rest } = queries;

if (startDate && endDate) {
  // convert the strings to dates
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);
  whereClause.AND = [
    { date_assigned: { gte: parsedStartDate } },
    { date_completed: { lte: parsedEndDate } },
  ];
} else if (startDate) {
  // convert the string to a date
  const parsedStartDate = new Date(startDate);
  whereClause.date_assigned = { gte: parsedStartDate };
} else if (endDate) {
  // convert the string to a date
  const parsedEndDate = new Date(endDate);
  whereClause.date_completed = { lte: parsedEndDate };
}

whereClause = Object.assign(whereClause, rest);

console.log(whereClause);
let p = {
  id: "random uuid",
  worker_id: "id of the worker to whom the work is assigned",
  date_assigned: "date on which work is assigned",
  date_completed: "date on which work is completed",
  completed: true,
  raw_materials: [
    {
      id: "id of the raw material",
      quantity: "quantity of that raw material used",
    },
  ],
};

// const createArr = [{ quantity: 10, rawMaterial: { connect: { id: 0 } } }];
let a = [
  { id: 1, quantity: 10 },
  { id: 2, quantity: 5 },
];
const createArr = a.map((material) => {
  return {
    quantity: material.quantity,
    rawMaterial: { connect: { id: material.id } },
  };
});
