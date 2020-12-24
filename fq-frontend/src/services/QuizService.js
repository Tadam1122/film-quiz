import { http } from './HttpService'
import * as auth from './AuthService'

export async function getQuizzes() {
  return await http().get('/quiz')
}

export async function getQuiz(id) {
  return await http().get(`/quiz/${id}`)
}

export async function createQuiz(quiz) {
  return await http().post('/quiz', quiz)
}

export async function updateQuiz(quiz) {
  return await http().put('/quiz', quiz)
}

export async function deleteQuiz(id) {
  return await http().delete(`/quiz/${id}`)
}

export function updateGame(user) {
  return http()
    .post('/game', user)
    .then((res) => {
      if (res) {
        auth.setToken(res.data.token)
      }
    })
}
