
const state = {
	user: null
}

const mutations = {
	setUser(state, user){
		state.user = user;
	}
}

const actions = {
		setUser({ commit }, user){
			commit('setUser',user);
		}
}

const getters = {
	getUser: (state) => {
		return state.user
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
