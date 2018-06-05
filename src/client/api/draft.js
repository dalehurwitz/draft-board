import { get, post } from './requests'

function getDraft (slug) {
  return get(`/api/draft/${slug}`)
}

function createDraft (name, teams) {
  return post('/api/create', {
    name,
    teams
  })
}

export { getDraft, createDraft }
