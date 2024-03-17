import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "@/utils/constants";

export type RegistrationCredentials = {
    name: string,
    password: string,
    email: string
}
export type RegistrationResponse = {
    id: number
}

const REGISTRATE_USER_URL = `${BASE_URL}/api/users`

export const registrateUser = async (credentials: RegistrationCredentials) => {
    return await axios
        .post(
            REGISTRATE_USER_URL,
            credentials
        )
        .then(
            (response: AxiosResponse<RegistrationResponse>) => {
                return response.data
            }
        );
}