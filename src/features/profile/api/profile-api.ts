import { ENDOPOINTS } from '@/lib/endpoints';
import api from '@/lib/axios';
import { VendorResponse } from '../types';
import { UpdateProfilePayload } from '@/features/products/types';

export async function getProfile(): Promise<VendorResponse> {
    const response = await api.get(`${ENDOPOINTS.PROFILE}`);
    return response.data;
}




export const updateProfile = async (payload: Partial<UpdateProfilePayload>) => {
    const formData = new FormData()

    // Only append fields that are provided
    if (payload.first_name !== undefined) {
        formData.append("first_name", payload.first_name)
    }

    if (payload.middle_name !== undefined) {
        formData.append("middle_name", payload.middle_name)
    }

    if (payload.last_name !== undefined) {
        formData.append("last_name", payload.last_name)
    }

    if (payload.bio !== undefined) {
        formData.append("bio", payload.bio)
    }

    // Handle image separately - only append if it exists in payload
    if (payload.hasOwnProperty('image')) {
        if (payload.image instanceof File) {
            formData.append("image", payload.image)
        } else if (payload.image === null) {
            // If image is explicitly set to null, append an empty string or handle as needed
            formData.append("image", "")
        }
    }

    const { data } = await api.patch(ENDOPOINTS.PROFILE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

    return data.data
}