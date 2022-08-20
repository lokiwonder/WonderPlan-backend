// description : API END POINT //

// description : END POINT //
export const END_POINT = '/apis';

// description : AUTH Module END POINT //
export const AUTH_API = `${END_POINT}/auth`;

// description : POST /apis/auth/googleLogin //
export const GOOGLE_LOGIN_API = 'googleLogin';

// description : USER Module END POINT //
export const USER_API = `${END_POINT}/user`;

// description : POST /apis/user/createUser //
export const CREATE_USER_API = 'createUser';

// description : GET /apis/user/readUser //
export const READ_USER_API = 'readUser/:userEmail';

// description : GET /apis/user/readOwnInformation //
export const READ_OWN_INFORMATION_API = 'readOwnInformation';

// description : POST /apis/user/requestJoinCompany //
export const REQUEST_JOIN_COMPANY_API = 'requestJoinCompany';

// description : COMPANY Module END POINT //
export const COMPANY_API = `${END_POINT}/company`;

// description : POST /apis/company/createCompany //
export const CREATE_COMPANY_API = `createCompany`;

// description : GET /apis/company/readCompany //
export const READ_COMPANY_API = 'readCompany/:companyNumber';

// description : GET /apis/company/readCompanyList //
export const READ_COMPANY_LIST_API = 'readCompanyList';

// description : GET /apis/company/readJoinCompanyRequestList // -추가됨
export const READ_JOIN_COMPANY_REQUEST_LIST_API = 'readJoinCompanyRequestList';

// description : PATCH /apis/company/approvingCompanyMembership // -추가됨
export const APPROVING_COMPANY_MEMBERSHIP_API = 'approvingCompanyMembership';

// description : PATCH /apis/company/denyCompanyMembership // -추가됨
export const DENY_COMPANY_MEMBERSHIP_API = 'denyCompanyMembership';

// description : COMMUTE Module END POINT // - 추가됨
export const COMMUTE_API = `${END_POINT}/commute`;

// description : POST /apis/commute/recordWork // - 추가됨
export const RECORD_WORK_API = 'recordWork';

// description : CALENDAR Module END POINT // -추가됨
export const CALENDAR_API = `${END_POINT}/calendar`;

// description : GET /apis/calendar/readMonthSchedule // -추가됨
export const READ_MONTH_SCHEDULE_API = 'readMonthSchedule';

// description : GET /apis/calendar/readDaySchedule // -추가됨
export const READ_DAY_SCHEDULE_API = 'readDaySchedule';

// description : POST /apis/calendar/createSchedule // -추가됨
export const CREATE_SCHEDULE_API = 'createSchedule';
