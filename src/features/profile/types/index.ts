export interface VendorResponse {
  success: boolean;
  data: Vendor;
}

export interface Vendor {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  full_name: string;
  name: string;
  email: string;
  business_name: string;
  contact_email: string;
  contact_phone: string;
  city: string;
  country: string;
  address: string;
  bio: string;
  image: string | null;
  is_verified: boolean;
  is_active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
