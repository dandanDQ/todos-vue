import Vue from 'vue'
import Router from 'vue-router'
import calendar from './components/calendar'
import todolist from './components/todoList'

Vue.use(Router)

const pagerouter = new Router({
    routes: [{
            name: 'calendar',
            path: '/calendar',
            component: calendar,
        },
        {
            name: 'todolist',
            path: '/',
            component: todolist
        }
    ]
})

export default pagerouter