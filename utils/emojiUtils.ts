import keyword_extractor from "keyword-extractor";
import * as nodeEmoji from 'node-emoji';  // 修改导入方式
import { getEmojis } from 'unicode-emoji';


export function extractKeywords(text: string): string[] {
    return keyword_extractor.extract(text, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
    });
}

export async function findRelatedEmojis_nodeEmoji(keywords: string[]): Promise<string[]> {
    console.log('提取关键词：', keywords);
    const emojis = [];
    const allEmojis = nodeEmoji.search(''); // 获取所有emoji
    console.log('库存：', allEmojis);

    for (const keyword of keywords) {
        let bestMatch = null;
        let highestScore = -1;

        for (const emojiItem of allEmojis) {
            // 将emoji的名称和关键词都作为匹配源
            const emojiKeywords = [
                emojiItem.name,
                ...emojiItem.name.split('_'), // 处理如 'smiling_face' 这样的name
            ];

            const score = calculateSimilarity(keyword, emojiKeywords);
            if (score > highestScore) {
                highestScore = score;
                bestMatch = emojiItem.emoji;
            }
        }
        console.log('匹配：', bestMatch, highestScore);

        if (bestMatch && highestScore > 0.3) {
            emojis.push(bestMatch);
        }
    }

    return emojis.length > 0 ? emojis : ['😊']; // 如果没有匹配，返回一个默认表情
}

export async function findRelatedEmojis(keywords: string[]): Promise<string[]> {
    // console.log('提取关键词：', keywords);
    const emojis: string[] = [];
    const allEmojis = getEmojis();
    // console.log('库存：', allEmojis.length);

    for (const keyword of keywords) {
        let bestMatch = null;
        let highestScore = -1;

        for (const emojiItem of allEmojis) {
            const emojiKeywords = [
                emojiItem.description,
                ...emojiItem.keywords || [],
                emojiItem.group,
                emojiItem.subgroup
            ].filter(Boolean);

            const score = calculateSimilarity(keyword, emojiKeywords);
            if (score > highestScore) {
                highestScore = score;
                bestMatch = emojiItem.emoji;
            }
        }
        // console.log('匹配：', bestMatch, highestScore);

        if (bestMatch && highestScore > 0.3) {
            emojis.push(bestMatch);
        }
    }

    return emojis.length > 0 ? emojis : ['😊'];
}

function calculateSimilarity(keyword: string, emojiKeywords: string[]): number {
    let maxScore = 0;

    for (const emojiKeyword of emojiKeywords) {
        // 转换为小写进行比较
        const normalizedKeyword = keyword.toLowerCase();
        const normalizedEmojiKeyword = emojiKeyword.toLowerCase();

        // 完全匹配给最高分
        if (normalizedKeyword === normalizedEmojiKeyword) {
            return 1;
        }

        // 使用余弦相似度
        const score = calculateCosineSimilarity(normalizedKeyword, normalizedEmojiKeyword);
        maxScore = Math.max(maxScore, score);
    }

    return maxScore;
}

function calculateCosineSimilarity(str1: string, str2: string): number {
    // 创建字符频率向量
    const vector1 = createVector(str1);
    const vector2 = createVector(str2);

    // 计算点积
    let dotProduct = 0;
    const uniqueChars = new Set([...Object.keys(vector1), ...Object.keys(vector2)]);
    uniqueChars.forEach(char => {
        dotProduct += (vector1[char] || 0) * (vector2[char] || 0);
    });

    // 计算向量的模
    const magnitude1 = Math.sqrt(Object.values(vector1).reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(Object.values(vector2).reduce((sum, val) => sum + val * val, 0));

    // 避免除以零
    if (magnitude1 === 0 || magnitude2 === 0) return 0;

    // 计算余弦相似度
    return dotProduct / (magnitude1 * magnitude2);
}

function createVector(str: string): { [key: string]: number } {
    return str.split('').reduce((vector, char) => {
        vector[char] = (vector[char] || 0) + 1;
        return vector;
    }, {} as { [key: string]: number });
} 