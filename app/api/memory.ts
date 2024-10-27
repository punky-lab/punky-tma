import MemoryClient from 'mem0ai';
import * as dotenv from 'dotenv';

dotenv.config();
const api_key: string = String(process.env.MY_MEM0_API_KEY || 'default_value');

const client = new MemoryClient(api_key);// 使用“mxxxxx”类型的api key测试，这里环境变量加载有点问题，暂时写死

interface Message {
    role: string;
    content: string;
  }
  
  // 定义一个类型来表示消息数组
  type Mem0Msg = Message[];

export async function addmemory(message: Mem0Msg) {
    client.add(message, { user_id: "punky-test" })
  }

    // .then(response => console.log(response))
    // .catch(error => console.error(error));

