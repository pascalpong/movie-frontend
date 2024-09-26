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
    id: number,
    actor: string|null,
    actor_images: string[],
    author: string|null,
    bunny_url: string|null,
    cate_id: number|null,
    createdBy: string|null,
    createdDate: string|null,
    des: string|null,
    duration: string|null,
    genre: string|null,
    image: string|null,
    location: string|null,
    number_ep: string|null,
    producer: string|null,
    release_date: string|null,
    status: boolean|null,
    statusvideo: boolean|null,
    title: string|null,
    title_id: number|null,
    updatedBy: string|null,
    updatedDate: string|null,
    url_movie: string|null,
    video_episode: number|null,
    view_count: string|null,
}

export interface PageInfoType {
    current_page: number|null, 
    last_page: number|null, 
    per_page: number|null, 
    total: number|null 
}

export interface IHeaderMovie {
    id :number,
    type : string,
    title : string
}

export interface IBannerMovie {
    id : number,
    img :string
}

export interface IMovieIntroduce {
    img: string,
    title: string,
    id: number,
    views?: string
}