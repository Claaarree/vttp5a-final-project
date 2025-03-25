export interface User {
    email: string
    password: string
}

export interface NewUser {
    email: string
    password: string
    username: string
}

export interface LoginResponse {
    localId: string
    idToken: string
    refreshToken: string
}

export interface TokenSlice{
    userId: string
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
    postId: string
    userId: string
    displayName: string
    rating: number
    review: string
    images: string
    placeId: string
    name: string
    address: string
    area: string
    lat: number
    lng: number
    postDate: number
}

export interface PostUpdate {
    rating: number
    review: string
}

export interface UpdateResult {
    message: string
}

export interface FinalPlace {
    placeId: string
    name: string
    address: string
    area: string
    lat: number
    lng: number
    postCount: number
    averageRating: number
}

export interface MapInfo {
    placeId: string
    coords: google.maps.LatLngLiteral
    content: string
}



