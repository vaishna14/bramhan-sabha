// import { INCREMENT, DECREMENT } from './counter.types';


const INITIAL_STATE = {

    count: 0,
    fatherAlive:"Yes",
    motherAlive:"Yes",
    displayType:"personal",
    partnerFatherAlive: "Yes",
    partnerMotherAlive:"Yes"
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

        case "DECREMENT":

           return {
              ...state, count: state.count - 1,

           };

         default: return state;

    }

};

export default reducer;