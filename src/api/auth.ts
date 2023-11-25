import axios from 'axios';

interface LoginCredentials {
    username: string;
    password: string;
}

export const login = async (credential: LoginCredentials) => {
    try {
        console.log("A")
    } catch (error) {
        throw error;
    }
}