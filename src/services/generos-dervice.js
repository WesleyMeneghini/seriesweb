import { doRequest } from './baseapi-service'

const RESOURCE = 'generos/'

export const listarGeneros = () => {
    return doRequest(RESOURCE, 'GET')
}