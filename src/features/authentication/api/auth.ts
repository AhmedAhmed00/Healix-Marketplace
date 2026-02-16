import { ENDOPOINTS } from '@/lib/endpoints';
import { type LoginResponse, type LoginRequest } from './../types/index';
import api from '@/lib/axios';

export async function loginUser(
    credentials: LoginRequest
): Promise<LoginResponse["data"]> {

    const { data } = await api.post < LoginResponse > (
        `${ENDOPOINTS.LOGIN}`,
        credentials
    )

    if (!data.success) {
        throw new Error(data.message || "Login failed")
    }

    return data.data
}
