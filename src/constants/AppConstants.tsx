// Reducer actions
export const LOGIN_AUTHORIZE = 'AUTHORIZE';
export const LOGOUT = 'LOGOUT';

export const UPDATE_USERNAME = 'UPDATEUSERNAME';
export const UPDATE_USER_PROFILE_PICTURE = 'UPDATEUSERPROFILEPICTURE';

export const LANG_CHANGE = 'CHANGELANGUAGE';
export const THEME_CHANGE = 'CHANGETHEME';
export const FONT_CHANGE = 'CHANGEFONT';
export const FONT_SIZE_CHANGE = 'FONTSIZECHANGE';
export const RESET_PREFERENCE = 'RESETPREFENCE';
export const MESSAGE_ADD = "ADDMESSAGE";
export const MESSAGE_DISMISS = "DISMISSMESSAGE";

// Bottom tabs
export const NAVIGATION_BOTTOM_TAB_HOME = 'Home';
export const NAVIGATION_BOTTOM_TAB_EXPLORE = 'Explore';
export const NAVIGATION_BOTTOM_TAB_CART = 'Cart';
export const NAVIGATION_BOTTOM_TAB_ACCOUNT = 'Account';

// Auth screens
export const NAVIGATION_AUTH_SIGNIN = 'SignIn';
export const NAVIGATION_AUTH_SIGNUP = 'SignUp';
export const NAVIGATION_AUTH_VERIFY = 'VerifyEmail';
export const NAVIGATION_AUTH_ACTIONCOMPLETE = 'ActionComplete';

// Main - Cart Screens
export const NAVIGATION_MAIN_CART = 'Cart';
export const NAVIGATION_MAIN_CART_DELIVERY = 'Cart Delivery';
export const NAVIGATION_MAIN_CART_DETAIL = 'Cart Detail';

// Main - Home + Explore related Screens
export const NAVIGATION_MAIN_PRODUCT = 'Product';
export const NAVIGATION_MAIN_PRODUCT_DETAIL = 'Product Detail';
export const NAVIGATION_MAIN_PRODUCT_FILTER = 'Product Filter';
export const NAVIGATION_MAIN_PRODUCT_REVIEW = 'Product Reviews';
export const NAVIGATION_MAIN_PRODUCT_REVIEW_EDIT = 'Review Edit';

// Main - Account Screens
export const NAVIGATION_MAIN_ACCOUNT = 'Account';
export const NAVIGATION_MAIN_PROFILE = 'Profile';
export const NAVIGATION_MAIN_PROMOCODES = 'Promocodes';
export const NAVIGATION_MAIN_SETTINGS = 'Settings';
export const NAVIGATION_MAIN_UPDATE_INFO = 'Update User Info';
export const NAVIGATION_MAIN_ADDRESS = 'Address';
export const NAVIGATION_MAIN_ADDRESS_EDIT = 'Edit Address';
export const NAVIGATION_MAIN_ABOUTUS = 'About Us';
export const NAVIGATION_MAIN_ORDER = 'User Order';
export const NAVIGATION_MAIN_ORDER_DETAIL = 'User Order Detail';

// Default Images
export const IMAGE_AUTH_BACKGROUND = 'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg';

export const IMAGE_HOME_HEADER = 'https://images.pexels.com/photos/1458282/pexels-photo-1458282.jpeg';
export const IMAGE_HOME_HEADER_DARK = 'https://images.pexels.com/photos/4041428/pexels-photo-4041428.jpeg'

export const IMAGE_ORDER_PENDING = 'https://images.pexels.com/photos/2419256/pexels-photo-2419256.jpeg';
export const IMAGE_ORDER_DELIVERING = 'https://images.pexels.com/photos/8988448/pexels-photo-8988448.jpeg';
export const IMAGE_ORDER_COMPLETED = 'https://images.pexels.com/photos/4560083/pexels-photo-4560083.jpeg';
export const IMAGE_ORDER_FAIL = 'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg';

// Messages
export const MSG_FIELDS_EMPTY = "'Fields cannot be empty";
export const MSG_NO_SESSION = "No previous Sign In session";
export const MSG_LOGIN_INVALID = "Invalid username or password";
export const MSG_LOGIN_SUCCESS = "Welcome back ";
export const MSG_GOOGLE_INFO_FAIL = "Fail to get user info";
export const MSG_GOOGLE_FAIL = "Login Failed";
export const MSG_SIGNUP_SUCCESS = "Sign Up Success! Check your email for verification";
export const MSG_SIGNUP_FAIL = "Sign Up Fail";
export const MSG_PASSWORDS_MISMATCH = "Passwords does not match";
export const MSG_USER_NOT_FOUND = "No account associated with your email. Please check again";
export const MSG_PSCHANGE_NEW_USER = "No user found. New account created";
export const MSG_PSCHANGE_SUCCESS = "Send password change email success";
export const MSG_SIGNOUT_SUCCESS = "Sign Out success"
export const MSG_ADDRESS_NEW = "New address created success"
export const MSG_ADDRESS_UPDATE = "Update address success"
export const MSG_ORDER_SUCCESS = "Order success"
export const MSG_CART_DELETE = "Cart item deleted"
export const MSG_PRODUCT_ADD = "Product add to cart"