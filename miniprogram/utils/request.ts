import { getEnvConfig } from '../env/index';

const { API_BASE_URL } = getEnvConfig();

// 添加类型定义
type RequestMethod = 'GET' | 'POST' | 'OPTIONS' | 'HEAD' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

const request = <T>(url: string, method: RequestMethod = 'GET', data: any = {}): Promise<T> => {
    return new Promise((resolve, reject) => {
        const accessToken = wx.getStorageSync('accessToken');
        
        // 构建完整的 URL
        const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
        
        // 构建基础 header
        const header: Record<string, string> = {
            'Content-Type': 'application/json'
        };
        
        // 只在 accessToken 存在时添加到 header
        if (accessToken) {
            header.Authorization = `Bearer ${accessToken}`;
        }
        
        wx.request({
            url: fullUrl,
            method,
            data,
            header,
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data as T);
                } else {
                    reject(res);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

const get = <T>(url: string, data: any = {}): Promise<T> => {
    return request<T>(url, 'GET', data);
};

const post = <T>(url: string, data: any = {}): Promise<T> => {
    return request<T>(url, 'POST', data);
};



export { get, post }; 