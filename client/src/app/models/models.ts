export interface User {
    email: string
    password: string
}

export interface Post {
    rating: string
    review: string
    placeId: string
}

export interface UploadResult {
    postId: string
}

export interface Image {
    src: string
}

export interface Place {
    placeId: string
    name: string
    formattedAddress: string
    lat: number
    lng: number
    area: string
}


