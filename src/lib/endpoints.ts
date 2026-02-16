
type EndpointsType = {
    [key: string]: string;

}

export const ENDOPOINTS: EndpointsType = {
    LOGIN: "/api/v1/marketplace/dashboard/vendor/auth/login/",
    CHANGE_PASSWORD: "/api/v1/marketplace/dashboard/vendor/auth/change-password/",
    PRODUCTS: "/api/v1/marketplace/dashboard/vendor/products/",
    CATEGORIES: "/api/v1/marketplace/dashboard/vendor/categories/",
    ORDERS: '/api/v1/marketplace/dashboard/vendor/orders/',
    PROFILE: "/api/v1/marketplace/dashboard/vendor/profile/"
}