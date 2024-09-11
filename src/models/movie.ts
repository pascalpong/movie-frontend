import { AdType } from ".";

export const movieCategoriesDetails = {
    1: {
        id: 1,
        type: 'movie',
        title: '영화'
    },
    2: {
        id: 2,
        type: 'drama',
        title: '드라마'
    }, 
    3: {
        id: 3,
        type: 'variety',
        title: '예능'
    }, 
    4: {
        id: 4,
        type: 'music',
        title: '음악프로'
    }, 
    5: {
        id: 5,
        type: 'animation',
        title: '애니'
    },
    6: {
        id: 6,
        type: 'documentary',
        title: '시사/다큐'
    }, 
}

export interface VodsType {
    category: string,
    notice: string,
    ad: AdType[],
    cc: number,
    plays: PlayType[],
    profiles: ProfilesType[],
}

export interface PlayType {
    id: string,
    title: string|null,
    pid: string|null,
    sub_title: string|null,
    m3u8: string|null,
    add_time: string|null,
    up_time: string|null,
    del: string|null,
    dis: string|null,
    m3u81: string|null,
    m3u82: string|null,
    visit: string|null,
    rank: string|null,
    token: string|null,
    run_time: string|null,
    category: string|null,

}

export interface ProfilesType {
    id: string|null,
    title: string|null,
    intro: string|null,
    doc1: string|null,
    doc2: string|null,
    doc3: string|null,
    doc4: string|null,
    doc5: string|null,
    doc6: string|null,
    doc7: string|null,
    doc8: string|null,
    add_time: string|null,
    up_time: string|null,
    cc: string|null,
    img: string|null,
    category: string|null,
    dis: string|null,
    run_time: string|null,
    rank: string|null,
    del: string|null,
    views: string|null,
    new: string|null,
    token: string|null,
    sub_title: string|null,
}

export interface PageInfoType {
    current_page: number|null, 
    last_page: number|null, 
    per_page: number|null, 
    total: number|null 
}