import {
    createStore
} from 'redux'


function character_store(state = {
    hair_id: 0,
    skin_id: 0,
    horn_id: 0
}, action) {
    switch (action.type) {
        case 'NEXT_HAIR':
            return Object.assign(state, {
                hair_id: (state.hair_id + 1) % 6
            })
        case 'PREVIOUS_HAIR':
            return Object.assign(state, {
                hair_id: (6 + state.hair_id - 1) % 6
            })
        case 'NEXT_SKIN':
            return Object.assign(state, {
                skin_id: (state.skin_id + 1) % 3
            })
        case 'PREVIOUS_SKIN':
            return Object.assign(state, {
                skin_id: (3 + state.skin_id - 1) % 3
            })
        case 'NEXT_HORN':
            return Object.assign(state, {
                horn_id: (state.horn_id + 1) % 4
            })
        case 'PREVIOUS_HORN':
            return Object.assign(state, {
                horn_id: (4 + state.horn_id - 1) % 4
            })
        case 'SAVE':
            return state;
        default:
            return state
    }
}

const store = createStore(character_store)

export default store;