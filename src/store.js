import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'todoevents'

const state = {
    events: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

const mutations = {
    addEvent(state, event) {
        state.events.push(event)
    },
    removeEvent(state, event) {
        state.events.splice(state.events.indexOf(event), 1)
    },
    editEvent(state, { event, name = event.name }) {
        var index = state.events.indexOf(event)
        state.events[index].name = name
            //event.name = name
    },
    toggleEvent(state, event) {
        var index = state.events.indexOf(event)
        state.events[index].done = !state.events[index].done
    }
}

const actions = {
    addEvent({ commit }, event) {
        console.log(event);

        commit('addEvent', {
            name: event.name,
            start: event.start,
            end: event.end,
            uid: Date.now(),
            done: false,
            color: event.color,
        })
    },
    removeEvent({ commit }, event) {
        commit('removeEvent', event)
    },
    editEvent({ commit }, { event, value }) {
        commit('editEvent', { event, name: value })
    },
    toggleEvent({ commit }, event) {
        commit('toggleEvent', event)
    },
    clearFinished({ state, commit }) {
        console.log("来了")
        state.events.filter(event => event.done)
            .forEach(event => {
                commit('removeEvent', event)
            })
    }
}

const plugins = [store => {
    store.subscribe((mutation, { events }) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
    })
}]

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins
})