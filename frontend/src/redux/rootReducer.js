
    import { combineReducers } from 'redux';


    import personalDetailReducer from './personalDetailReducer';


    const rootReducer = combineReducers({

        personal: personalDetailReducer,

    });

    export default rootReducer;