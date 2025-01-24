// 创建新的环境配置文件
export const ENV = {
    development: {
        API_BASE_URL: 'https://apifoxmock.com/m1/3473666-1720078-default'
    },
    production: {
        API_BASE_URL: 'https://api.your-domain.com'
    }
};

// 根据环境变量获取配置
export const getEnvConfig = () => {
    // #ifdef DEBUG
    return ENV.development;
    // #endif
    
    // #ifndef DEBUG
    return ENV.production;
    // #endif
};