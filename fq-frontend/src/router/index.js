import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import JoinQuiz from '../views/game/JoinQuiz.vue'
import HostQuiz from '../views/game/HostQuiz.vue'
import QuizQueue from '../views/game/QuizQueue.vue'
import HostQuestion from '../views/game/HostQuestion.vue'
import HostAnswer from '../views/game/HostAnswer.vue'
import PlayerQuestion from '../views/game/PlayerQuestion.vue'
import PlayerAnswer from '../views/game/PlayerAnswer.vue'
import QuizResults from '../views/game/QuizResults'
import EditQuiz from '../views/admin/EditQuiz.vue'
import CreateQuiz from '../views/admin/CreateQuiz.vue'
import AdminPage from '../views/admin/AdminPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Film Quiz' },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About - Film Quiz' },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'Register - Film Quiz' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login - Film Quiz' },
  },
  {
    path: '/join-quiz',
    name: 'JoinQuiz',
    component: JoinQuiz,
    meta: { title: 'Join Quiz - Film Quiz' },
  },
  {
    path: '/host-quiz',
    name: 'HostQuiz',
    component: HostQuiz,
    meta: { title: 'Host Quiz - Film Quiz' },
  },
  {
    path: '/edit-quiz',
    name: 'EditQuiz',
    component: EditQuiz,
    props: true,
    meta: { title: 'Edit Quiz - Film Quiz' },
  },
  {
    path: '/create-quiz',
    name: 'CreateQuiz',
    component: CreateQuiz,
    meta: { title: 'Create Quiz - Film Quiz' },
  },
  {
    path: '/admin-page',
    name: 'AdminPage',
    component: AdminPage,
    meta: { title: 'Admin - Film Quiz' },
  },
  {
    path: '/quiz-queue',
    name: 'QuizQueue',
    component: QuizQueue,
    props: true,
  },
  {
    path: '/host-question',
    name: 'HostQuestion',
    component: HostQuestion,
    props: true,
  },
  {
    path: '/host-answer',
    name: 'HostAnswer',
    component: HostAnswer,
    props: true,
  },
  {
    path: '/player-question',
    name: 'PlayerQuestion',
    component: PlayerQuestion,
    props: true,
  },
  {
    path: '/player-answer',
    name: 'PlayerAnswer',
    component: PlayerAnswer,
    props: true,
  },
  {
    path: '/quiz-results',
    name: 'QuizResults',
    component: QuizResults,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',

  routes,
})

export default router
