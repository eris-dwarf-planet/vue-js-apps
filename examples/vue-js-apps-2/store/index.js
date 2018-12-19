import Vuex from 'vuex'
import axios from 'axios'

const store = () => new Vuex.Store({
    state: {
        todos: [],
        slug: "all",
        user: null
    },
    getters: {
        allTodos(state) {
            return state.todos;
        },
        activeTodos(state) {
            return state.todos.filter(todo => !todo.completed);
        },
        completedTodos(state) {
            return state.todos.filter(todo => todo.completed);
        },
        currentSlug(state) {
            return state.slug;
        },
        selectedTodos(state) {
            if (state.slug === 'active') {
                return state.todos.filter(todo => !todo.completed);
            }
            if (state.slug === 'completed') {
                return state.todos.filter(todo => todo.completed);
            }
            return state.todos;
        },
        isAuthenticated(state) {
            return !!state.user;
        },
        loggedUser(state) {
            return state.user;
        }
    },
    mutations: {
        SET_TODOS(state, todos) {
            state.todos = todos;
        },
        ADD_TODO(state, todo) {
            state.todos.push(todo);
        },
        REMOVE_TODO(state, todo) {
            var i = state.todos.indexOf(todo);
            state.todos.splice(i, 1);
        },
        FILTER_TODOS(state, value) {
            state.todos.forEach((todo) => {
                todo.completed = !value;
            });
        },
        SET_SLUG(state, slug) {
            state.slug = slug;
        },
        SET_USER(state, user) {
            state.user = user || null;
        }
    },
    actions: {
        addTodo({ commit }, todo) {
            commit('ADD_TODO', todo);
        },
        setTodos({ commit }, todos) {
            commit('SET_TODOS', todos);
        },
        removeTodo({ commit }, todo) {
            commit('REMOVE_TODO', todo);
        },
        allDone({ state, commit }) {
            var value = state.todos.filter(todo => todo.completed).length === state.todos.length;
            commit('FILTER_TODOS', value);
        },
        saveTodos({ state }) {
            // skip.
        },
        setSlug({ commit }, slug) {
            commit('SET_SLUG', slug);
        },
        setUser({ commit }, user) {
            commit('SET_USER', user);
        },
        nuxtServerInit({ commit }, { req }) {
            // commit('SET_TODOS', req.session.todos || [])
            commit('SET_TODOS', []);
        }
    }
})

export default store