import { environment } from "../../../environments/environment.prod";

//const BASE_URL =  environment.production? '' : 'http://localhost:5000';
const BASE_URL =  'http://localhost:5000';



export const ITEMS_URL = BASE_URL + '/api/items';
export const ITEMS_TAGS_URL = ITEMS_URL + '/tags';
export const ITEMS_BY_SEARCH_URL = ITEMS_URL + '/search/';
export const ITEMS_BY_TAG_URL = ITEMS_URL + '/tag/';
export const ITEMS_BY_ID_URL = ITEMS_URL + '/';

export const USERS_URL = BASE_URL + '/api/users';

export const USER_LOGIN_URL = BASE_URL  + '/api/users/login';

export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const USER_REMOVE_URL = BASE_URL + '/api/users/remove';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_CHANGE_STATUS_TO_APPROVE = ORDERS_URL + '/changeStatusToApprove'
export const ORDER_NEW_FOR_CURRENT_SCHOOL_CODE = ORDERS_URL + '/newOrdersForCurrentSchoolCode';
export const ORDER_FOR_CURRENT_USER_URL = ORDERS_URL + '/OrdersForCurrentUser';

export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';

export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';