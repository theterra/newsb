import axios from 'axios';
import { API_URL, userRole,userRoleType, session, franchiseRole, GEO_CODE_URL, GMAP_KEY } from './ApiConstants';
import fileSaver from 'file-saver';

const localStorage = global.window.localStorage;

const PilotApi = {
  getPilots(team, franchiseId) {
    const user = Object.keys(userRole())[0];
    const userId = Object.values(userRole())[0];
    const payload = {
      [user]: userId,
      team: team ? team : '',
      franchise: franchiseRole(franchiseId),
    };
    const GET_PILOTS_API = `${API_URL}/pilots/list`;
    return axios({
      method: 'POST',
      url: GET_PILOTS_API,
      data: payload,
      responseType: 'json',
    }).then((response) => response.data);
  },
  createPilot(data) {
    const payload = data;
    const ADD_PILOT_API = `${API_URL}/pilots`;
    return axios({
      method: 'POST',
      url: ADD_PILOT_API,
      data: payload,
      responseType: 'json',
    }).then((response) => response.data);
  },
  getPilotDetails(date, id) {
    const payload = {
      date: date,
      timeZone: 'Asia/Kolkata',
    };
    const GET_PILOT_DETAILS_API = `${API_URL}/pilots/activity/${id}`;
    return axios({
      method: 'POST',
      url: GET_PILOT_DETAILS_API,
      data: payload,
      responseType: 'json',
    }).then((response) => response.data);
  },
    getPilotLocation(data) {
        const GEO_LOCATION_API = `${GEO_CODE_URL}=${data[1]},${data[0]}&location_type=ROOFTOP&result_type=street_address&key=${GMAP_KEY}`;
        return axios({
            method: 'POST',
            url: GEO_LOCATION_API,
            responseType: 'json',
        }).then((response) => response.data);
    },
    getReport(id, date, type) {
      const payload = date;
      const GET_REPORT_API = `${API_URL}/${type}/report/${id}`;
      return axios({
        method: 'POST',
        url: GET_REPORT_API,
        data: payload,
        crossDomain: true,
        responseType: 'json',
      }).then((response) => {
        window.open(`https://season-boy-api.herokuapp.com/${response.data.file}`)
      });
    },
  forceLogout(id) {
    const payload = {
      isAvailable: false
    };
    const FORCE_LOGOUT_API = `${API_URL}/pilots/updateAvailability/${id}`;
    return axios({
      method: 'POST',
      url: FORCE_LOGOUT_API,
      data: payload,
      responseType: 'json',
    }).then((response) => response);
  }
};

export default PilotApi;
