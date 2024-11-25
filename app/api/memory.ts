import MemoryClient from 'mem0ai';
import * as dotenv from 'dotenv';
import * as os from 'os';
import { a } from 'framer-motion/client';

dotenv.config();
const apikey = String(process.env.NEXT_PUBLIC_MEM0_API_KEY);
const mem0client = new MemoryClient(apikey);// 使用“mxxxxx”类型的api key测试，这里环境变量加载有点问题，暂时写死

interface Message {
    role: string;
    content: string;
  }
  
  // 定义一个类型来表示消息数组
  type Mem0Msg = Message[];

export async function addmemory(user_name: string, message: Mem0Msg) {
  mem0client.add(message, { user_id: user_name });
}

    // .then(response => console.log(response))
    // .catch(error => console.error(error));
export async function searchmemory(user_name: string, query: string) {
  mem0client.search(query, { user_id: user_name })
    .then(results => { return results[0]; })
    .catch(error => console.error(error));
}

