import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "@/utils/constants";
import {DateTime} from "next-auth/providers/kakao";

export type RegistrationCredentials = {
    name: string,
    password: string,
    email: string
}


export type AuthCredentials = {
    email: string,
    password: string
}

export interface UserQuery {
    id: number;
    name: string;
    email: string;
    timeInfo: TimeInfo;
    documents: Document[];
}

interface TimeInfo {
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime;
}

interface Document {
    id: number;
    name: string;
    description: string;
    category: Category;
}

interface Category {
    id: number;
    name: string;
}


const REGISTRATE_USER_URL = `${BASE_URL}/api/users`
const AUTH_USER_URL = `${BASE_URL}/api/users/auth`

export const registrateUser = async (credentials: RegistrationCredentials) => {
    return await axios
        .post(
            REGISTRATE_USER_URL,
            credentials
        )
        .then(
            (response: AxiosResponse<UserQuery>) => {
                return response.data
            }
        );
}
export const authUser = async (credentials: AuthCredentials): Promise<UserQuery> => {
    return await axios
        .post(
            AUTH_USER_URL,
            credentials
        )
        .then(
            (response: AxiosResponse<UserQuery>) => response.data
        )
}