
import { LOCAL_TOKEN } from "./constants.js"

export const getLocalToken = () => localStorage.getItem(LOCAL_TOKEN) || '';

export const setLocalToken = (token) => localStorage.setItem(LOCAL_TOKEN, token);

export const removeLocalToken = () => localStorage.removeItem(LOCAL_TOKEN);