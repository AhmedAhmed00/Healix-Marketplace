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

export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
}

export interface ChangePasswordResponse {
    success?: boolean;
    message?: string;
}

export async function changePassword(
    credentials: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
    const { data } = await api.post<ChangePasswordResponse>(
        `${ENDOPOINTS.CHANGE_PASSWORD}`,
        credentials
    );
    return data;
}
