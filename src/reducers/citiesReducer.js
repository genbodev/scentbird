const reducer = (state = null, action) => {
    switch (action.type) {
        case "GET_CITIES_FULFILLED":
            state = {...state, data : action.payload};
            break;
        default: return state;
    }
    return state;
};

export default reducer;