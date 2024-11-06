import styled from "styled-components";
import { Window } from "react95";

// 基础页面容器
export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  background-color: #008080;
  overflow-y: auto;
`;

// Window 包装器
export const WindowWrapper = styled(Window)`
  width: 100%;
  height: 100%;
`;

// 内容容器
export const ContentWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 网格布局
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

// 卡片样式
export const Card = styled.div`
  border: 2px solid #424242;
  padding: 16px;
  background: white;
`;

// Flex 容器
export const FlexBox = styled.div<{ direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  gap: 8px;
  align-items: center;
`;
