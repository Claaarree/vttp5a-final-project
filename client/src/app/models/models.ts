export interface User {
    email: string
    password: string
}

export interface Post {
    rating: string
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




