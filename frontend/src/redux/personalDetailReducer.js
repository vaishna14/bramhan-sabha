// import { INCREMENT, DECREMENT } from './counter.types';


const INITIAL_STATE = {

  count: 0,
  fatherAlive: "Yes",
  motherAlive: "Yes",
  displayType: "personal",
  partnerFatherAlive: "Yes",
  partnerMotherAlive: "Yes",
  loading: false,
  child_count:1,
  child_id:"abc",
  message:[],
  marital_status:"",
  gender:"",
  column_select:[]
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case "display_type":

      return {
        ...state, displayType: action.displayType,

      };

    case "fatherAlive":

      return {

        ...state, fatherAlive: action.fatherAlive,

      };

    case "motherAlive":

      return {

        ...state, motherAlive: action.motherAlive,

      };

    case "partnerFatherAlive":

      return {

        ...state, partnerFatherAlive: action.partnerFatherAlive,

      };
    case "partnerMotherAlive":

      return {

        ...state, partnerMotherAlive: action.partnerMotherAlive,

      };
    case "loading":

      return {

        ...state, loading: action.loading,

      };

      case "message":

        return {
  
          ...state, message: action.message,
  
        };
        case "gender":

          return {
    
            ...state, gender: action.gender,
    
          };
        case "marital_status":

          return {
    
            ...state, marital_status: action.marital_status,
    
          };
    
      case "child_count":

        return {
  
          ...state, child_count: action.child_count,
  
        };
        case "child_id":

          return {
    
            ...state, child_id: action.child_id,
    
          };
          case "column_select":

            return {
      
              ...state, column_select: action.column_select,
      
            };
            case "profile":

              return {
        
                ...state, profile: action.profile,
        
              };
    case "DECREMENT":

      return {
        ...state, count: state.count - 1,

      };

    default: return state;

  }

};

export default reducer;