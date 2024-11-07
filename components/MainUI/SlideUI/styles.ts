import styled, { css } from "styled-components";
import { Window } from "react95";

// 基础混入样式
const baseStyles = css`
  image-rendering: pixelated;
`;

const baseShadow = css`
  box-shadow: rgb(0, 0, 0) 2px 2px 0px 0px,
             rgb(255, 255, 255) -2px -2px 0px 0px;
`;

// 基础容器
const BaseContainer = styled.div`
  ${baseStyles}
  padding: 16px;
`;

// 页面容器
export const Page = styled(BaseContainer)<{ $navHeight: number }>`
  width: 100%;
  height: ${props => `calc(100vh - ${props.$navHeight}px)`};
  background-color: #625669;
  backdrop-filter: blur(4px);
  overflow-y: auto;
  transition: top 0.3s steps(5);
`;

// Window 包装器
export const WindowWrapper = styled(Window)`
  width: 100%;
  height: 100%;
  ${baseStyles}
`;

// 内容布局组件
export const FlexBox = styled(BaseContainer)<{ direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  gap: 8px;
  align-items: center;
  padding: 0;
`;

export const Grid = styled(BaseContainer)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

// 卡片基础组件
export const Card = styled(BaseContainer)`
  border: 2px solid #424242;
  background: white;
  ${baseShadow}
  transition: transform 0.2s steps(3);
  
  &:hover {
    transform: translate(-2px, -2px);
  }
`;

// 滚动容器
export const ScrollContainer = styled(BaseContainer)`
  overflow-y: auto;
  height: calc(100% - 80px);
  padding: 0;
  
  // 隐藏滚动条但保持滚动功能
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// 特化的组件
export const TabsContainer = styled(BaseContainer)`
  padding: 0;
  
  // react95 的 Tabs 组件实际类名结构
  .w-window-tab-wrapper {
    display: flex;
    width: 100%;
  }
  
  .w-window-tab {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ChatContainer = styled(ScrollContainer)`
  height: 100%;
  flex: 1;
  border: 2px solid #424242;
  box-shadow: rgb(255, 255, 255) 2px 2px 0px 0px inset,
             rgb(0, 0, 0) -2px -2px 0px 0px inset;
`;

export const MessageBubble = styled(Card)<{ $isMe?: boolean }>`
  background: ${props => props.$isMe ? '#c3c7cb' : '#fff'};
  max-width: 70%;
  margin: ${props => props.$isMe ? '8px 0 8px auto' : '8px'};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    ${props => props.$isMe ? 'right: -8px' : 'left: -8px'};
    top: 8px;
    width: 8px;
    height: 8px;
    background: inherit;
    border-right: 2px solid #424242;
    border-bottom: 2px solid #424242;
    transform: ${props => props.$isMe ? 'rotate(-45deg)' : 'rotate(135deg)'};
  }
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid #424242;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

export const StatCard = styled(Card)`
  text-align: center;
  padding: 12px;
`;