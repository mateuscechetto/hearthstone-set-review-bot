export interface User {
    name: string,
    image: string,
    view_count: number,
    userToken: string,
    isStreamer: boolean,
    followers: number,
    score?: number,
    totalDeviation?: number,
}