export interface User {
    email: string
    password: string
}

export interface LoginResponse {
    idToken: string
    refreshToken: string
}

export interface TokenSlice{
    jwt: string
    refreshToken: string
    isAuthenticated: boolean
}

export interface Post {
    rating: number
    review: string
    placeId: string
}

export interface Place {
    placeId: string
    name: string
    address: string
    lat: number
    lng: number
    area: string
}

export interface Image {
    src: string
}

export interface UploadResult {
    postId: string
}

export interface FinalPost {
    rating: number
    review: string
    images: string
    name: string
    address: string
    area: string
    lat: number
    lng: number
}

export interface PostUpdate {
    rating: number
    review: string
}




