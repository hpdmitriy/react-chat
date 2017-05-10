import messages from './messages';
import channels from './channels';
import activeChannel from './activeChannel';
import auth from './auth';
import typers from './typers';
import homePage from './homePage';
import userValidation from './userValidation';
import environment from './environment';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  messages,
  channels,
  activeChannel,
  auth,
  typers,
  homePage,
  userValidation,
  environment,
  formReducer
});

export default rootReducer;
