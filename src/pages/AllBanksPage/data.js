export const CITY_NAMES = [
  "MUMBAI",
  "DELHI",
  "BANGALORE",
  "NOIDA",
  "AHEMDABAD",
];

export const FILTERS = {
  BANK: "Bank",
  IFSC: "Ifsc",
  BRANCH: "Branch",
  BANK_ID: "Bank ID",
  ADDRESS: "Address",
};

export const TABLE_HEADERS = [
  FILTERS.BANK,
  FILTERS.IFSC,
  FILTERS.BRANCH,
  FILTERS.BANK_ID,
  FILTERS.ADDRESS,
];

export const FILTER_KEY = {
  [FILTERS.BANK]: "bank_name",
  [FILTERS.IFSC]: "ifsc",
  [FILTERS.BRANCH]: "branch",
  [FILTERS.BANK_ID]: "bank_id",
  [FILTERS.ADDRESS]: "address",
};
