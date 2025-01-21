// 请求参数类型
export interface LoginParams {
    username: string;
    password: string;
}

export interface Rsp<T> {
    code: number;
    message: string;
    data: T;
}

export interface RspPage<T> {
    code: number;
    message: string;
    data: Page<T>;
}

export interface Page<T> {
    current: number;
    total: number;
    records: T;
}
// "current": 90,
// "total": 20,
// "size": 11,
// "records": 


export interface PageParams {
    page: number;
    pageSize: number;
}

// 返回数据类型
export interface LoginRsp {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    refreshExpiresIn?: number;
    tokenType?: string;
}

// Banners 返回数据类型
export interface Banner {
    id: string;
    imageUrl: string;
    link?: string;
}

export interface QuickAction {
    id: string;
    title: string;
    icon: string;
    path: string;
}

// 消息类型枚举
export enum MessageType {
    CHECKIN = 'checkin',
    REMINDER = 'reminder',
    SYSTEM = 'system'
}


// 消息列表请求参数
export interface MessageParams {
    page: number;
    pageSize: number;
}

// 消息列表响应
export interface MessageRsp {
    id: string;
    title: string;
    content: string;
    isRead: boolean;
    createTime: string;
}



export interface PointItemRsp {
    id: number;
    title: string;
    time: string;
    points: number;
}

export interface UserInfo {
    id: string;
    nickName: string;
    avatarUrl: string;
    bio?: string;
    checkinDays: number;
    points: number;
    level: number;
}




