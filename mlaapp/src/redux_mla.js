import {createStore} from 'redux'

const initialState={
	stateId:'',
    districtId:'',
    courtType:''
}

//Actions
export const selectState = (stateId) => {
    return { type: 'SELECT_STATE', stateId }
}

export const selectDistrict = (districtId) => {
    return { type: 'SELECT_DISTRICT', districtId }
}

export const selectCourtType = (courtType) => {
    return { type: 'SELECT_COURT_TYPE', courtType }
}

export const mla = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_STATE':
            return { stateId: action.stateId };
        case 'SELECT_DISTRICT':
            return { districtId: action.districtId };
        case 'SELECT_COURT_TYPE':
            return { courtType: action.courtType };
        default:
            return state;
    }
}

export const store=createStore(mla);

