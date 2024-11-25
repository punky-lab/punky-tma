import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在这里可以添加token等认证信息
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (refresh_token) {
          const response = await authApis.refreshToken(refresh_token);
          const { access_token, refresh_token: new_refresh_token } =
            response.data.data;

          // 更新存储的token
          localStorage.setItem("token", access_token);
          localStorage.setItem("refresh_token", new_refresh_token);

          // 更新原始请求的token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;

          // 重试原始请求
          return instance(originalRequest);
        }
      } catch (refreshError) {
        // token刷新失败，可能需要重新登录
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        // 这里可以添加重定向到登录页面的逻辑
      }
    }

    return Promise.reject(error);
  }
);

// API请求方法
export const api = instance;

// 类型定义

interface LoginResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
  };
}

interface LoginParams {
  grant_type?: string;
  username: string;
  password: string;
}

// 添加用户信息接口类型
interface UserInfo {
  name: string;
  email: string;
  telegram_id: string | null;
  telegram_username: string | null;
  solana_wallet: string | null;
  id: string;
  primary_game_account_id: string;
}

interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

// 添加游戏账户接口类型
interface GameAccount {
  pet_name: string;
  coins: number;
  fitness: number;
  happiness: number;
  loyalty: number;
  is_primary: boolean;
  id: string;
  user_id: string;
  created_at: string;
  last_interaction_at: string;
  last_view_at: string;
}

// 添加聊天消息接口类型
interface ChatMessage {
  message: string;
}

interface ChatResponse {
  interaction: {
    interaction_date: string;
    chat_count: number;
    last_chat_sent_at: string;
    last_response_at: string;
    id: string;
    game_account_id: string;
  };
  response: string;
  keywords: {
    [key: string]: string[];
  };
  emojis: string;
}

// 添加摸宠物接口响应类型
interface PetInteractionResponse {
  interaction_date: string;
  feeding_count: number;
  petting_count: number;
  last_feeding_at: string;
  last_petting_at: string;
  id: string;
  game_account_id: string;
}

// 登录接口
export const authApis = {
  // 用户登录
  login: (params: LoginParams) => {
    const loginData = new URLSearchParams({
      grant_type: params.grant_type || "password",
      username: params.username,
      password: params.password,
    });

    return api.post<LoginResponse>("/auth/login", loginData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  // 刷新token
  refreshToken: (refresh_token: string) => {
    return api.post<LoginResponse>("/auth/refresh", { refresh_token });
  },

  // 获取用户信息
  getUserInfo: () => {
    return api.get<ApiResponse<UserInfo>>("/users/me");
  },

  // 获取游戏账户信息
  getGameAccount: () => {
    return api.get<ApiResponse<GameAccount>>("/game/account");
  },

  // 获取聊天回复
  getReply: (message: string) => {
    return api.post<ApiResponse<ChatResponse>>("/game/chat/message", {
      message: message,
    });
  },

  // 摸宠物接口
  touchPet: () => {
    return api.post<ApiResponse<PetInteractionResponse>>("/game/pet/pet");
  },
};

export default api;
