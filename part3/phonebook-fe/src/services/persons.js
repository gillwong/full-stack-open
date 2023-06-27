import axios from 'axios'

const baseUrl = `/api/persons`

const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
)

const create = (newEntry) => (
  axios
    .post(baseUrl, newEntry)
    .then(response => response.data)
)

const update = (id, newEntry) => (
  axios
    .put(`${baseUrl}/${id}`, newEntry)
    .then(response => response.data)
)

const remove = (id) => (
  axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.status)
)

export default { getAll, create, update, remove }