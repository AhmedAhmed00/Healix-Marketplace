// src/types/auth.ts

export interface Vendor {
    id: number
    first_name: string
    middle_name: string | null
    last_name: string
    email: string
    business_name: string
    contact_email: string
    contact_phone: string
    city: string
    country: string
    address: string
    bio: string
    image: string | null
    is_verified: boolean
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    success: boolean
    message: string
    data: {
        vendor: Vendor
        access: string
        refresh: string
    }
}
