import auth from './Auth';
export const API_URL = 'https://season-boy-api.herokuapp.com/api';
export const userRole = () => {
  if(auth.loggedIn()){
    const session = JSON.parse(localStorage.getItem('sessionData'));
    if(session['username'] === 'admin') {
      return {manager:session['manager']['_id']};
    } else if(session['username'] === 'merchant') {
      return {customer:session['customer']['_id']};
    }
  };
};
