import { redirectTo } from '../js/functions/fuctions.js';
import { removeLocalStorageData } from './../js/functions/utilities.js';

removeLocalStorageData('user');

redirectTo('../index.html');
