import styled from "styled-components";
import { Window } from "react95";

// 基础页面容器
export const Page = styled.div<{ $navHeight: number }>`
    position: relative;
    width: 100%;
    height: ${props => `calc(100vh - ${props.$navHeight}px)`};
    padding: 16px;
    box-sizing: border-box;
    backdrop-filter: blur(4px);
    overflow-y: auto;
    transition: top 0.3s steps(5);
    image-rendering: pixelated;
`;

// Window 包装器
export const WindowWrapper = styled(Window)`
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    box-shadow: 
        rgb(0, 0, 0) 3px 3px 0px 0px inset,
        rgb(255, 255, 255) -3px -3px 0px 0px inset;
`;

// 内容容器
export const ContentWrapper = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    image-rendering: pixelated;
`;

// 网格布局
export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    image-rendering: pixelated;
`;

// 卡片样式
export const Card = styled.div`
    border: 2px solid #424242;
    padding: 16px;
    background: white;
    box-shadow: 
        rgb(0, 0, 0) 2px 2px 0px 0px,
        rgb(255, 255, 255) -2px -2px 0px 0px;
    image-rendering: pixelated;
    transition: transform 0.2s steps(3);
    
    &:hover {
        transform: translate(-2px, -2px);
    }
`;

// Flex 容器
export const FlexBox = styled.div<{ direction?: 'row' | 'column' }>`
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    gap: 8px;
    align-items: center;
    image-rendering: pixelated;
`;
