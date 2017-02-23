import _ from 'lodash';

const initialState = {
  orderexpand: false,
  pickupcord: {},
  deliverycord: {},
  orderDisplay: '',
  stats: {
    orderStats: {},
    pilotStats: {},
    error: '',
    request: false,
  },
  searchText: '',
  teamsPanel: {
    teams: {},
    teamSales: {},
    teamCustomers: {},
    error: '',
    request: false,
  },
  addTask: {
    pickup: {
      from_name: '',
      from_phone: '',
      from_email: '',
      from_address: '',
    },
    delivery: {
      to_name: '',
      to_phone: '',
      to_email: '',
      to_address: '',
    },
    taskInfo:{
    title: '',
    description: '',
    team: '',
    pilots: [],
  },
  request: false,
  },
  auto: 'auto',
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_EXPAND':
      return { ...state,
        orderexpand: action.value };
    case 'ORDER_CLOSE':
      return { ...state,
        orderexpand: action.value };
    case 'PICKUP_CORD':
      return { ...state,
        pickupcord: action.value };
    case 'DELIVERY_CORD':
      return { ...state,
        deliverycord: action.value };
    case 'GET_ORDER_STATS_SUCCESS':
      return { ...state,
        stats: {
          ...state.stats,
          orderStats: action.payload,
        } };
    case 'GET_PILOT_STATS_SUCCESS':
      return { ...state,
        stats: {
          ...state.stats,
          pilotStats: action.payload,
        } };
    case 'GET_STATS_FAILURE':
      return { ...state,
        stats: {
          ...state.stats,
          error: action.payload,
        } };
    case 'STATS_REQUEST':
      return { ...state,
        stats: {
          ...state.stats,
          request: action.req,
        } };
    case 'ON_SEARCH':
      return { ...state,
        searchText: action.payload,
      };
    case 'GET_TEAMS_SUCCESS':
      return { ...state,
        teamsPanel: {
          ...state.teamsPanel,
          teams: action.payload.map((team) => {
            team.open = false;
            return team;
          }),
        },
      };
    case 'GET_TEAMS_FAILURE':
      return { ...state,
        teamsPanel: {
          ...state.teamsPanel,
          error: action.payload,
        },
      };
    case 'GET_TEAM_SALES_SUCCESS':
      return { ...state,
      teamsPanel: {
        ...state.teamsPanel,
        teamSales: action.payload,
      },
    }
    case 'GET_TEAM_SALES_FAILURE':
      return { ...state,
      teamsPanel: {
        ...state.teamsPanel,
        error: action.payload,
      },
    }
    case 'GET_TEAM_CUSTOMERS_SUCCESS':
        return { ...state,
        teamsPanel: {
          ...state.teamsPanel,
          teamCustomers: action.payload,
        },
      };
    case 'GET_TEAM_CUSTOMERS_FAILURE':
      return { ...state,
        teamsPanel: {
          ...state.teamsPanel,
          error: action.payload,
        },
      };
    case 'PICKUP_CHANGE':
      return { ...state,
        addTask: {
          ...state.addTask,
          pickup: action.payload,
        },
      };
    case 'DELIVERY_CHANGE':
      return { ...state,
      addTask: {
        ...state.addTask,
        delivery: action.payload,
      },
    };
    case 'ADD_TASK_INFO':
    return { ...state,
      addTask: {
        ...state.addTask,
        taskInfo: action.payload,
      },
    };
    case 'ADDING_TASK':
    return { ...state,
      addTask: {
        ...state.addTask,
        request: action.payload,
      },
    };
    case 'CLEAR_FORM':
    return { ...state,
      addTask: initialState.addTask,
    };
    case 'SET_SELECTION':
    return { ...state,
      auto: action.payload,
    };
    case 'ACCORDION_OPEN':
    return accordionOpen(state, action);
    default:
      return state;
  }
}

function accordionOpen(state, action) {
  const index = _.findIndex(state.teamsPanel.teams, {
    _id: action.payload
  });
  const newState = state.teamsPanel.teams.slice();
  if (state.teamsPanel.teams[index]['open']) {
    newState[index]['open'] = !state.teamsPanel.teams[index]['open'];
  } else {
    newState.forEach((team) => team.open = false);
    newState[index]['open'] = true;
  }
  return {
    ...state,
    teamsPanel: {
      ...state.teamsPanel,
      teams: newState,
    },
  };
}
export default homeReducer;
