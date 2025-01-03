import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll...() {
    return api.get('');
}

export async function get...ById(id) {
    return api.get('' + id);
}

export async function getMy...(userId){
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function create...(...) {
    return api.post('', ...);
}

export async function edit...(id, ...) {
    return api.put('' + id, ...);
}

export async function delete...ById(id) {
    return api.del('' + id);
}



























