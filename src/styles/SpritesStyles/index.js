import styled from "styled-components";

// SpriteGrid: 가로로 일렬 배치, 열 개수를 고정하고 맨 위에서 시작
export const SpriteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px); /* 4개의 열로 고정 */
  gap: 10px; /* 요소 사이 간격 */
  padding: 20px;
  justify-items: start; /* 가로 정렬을 왼쪽으로 고정 */
  justify-content: start; /* 그리드 컨테이너 안에서 왼쪽으로 정렬 */
  align-items: start; /* 각 아이템을 맨 위에 배치 */
  align-content: start; /* 그리드 컨테이너를 맨 위에서 시작하게 설정 */
  height: 100%; /* 그리드 컨테이너 전체 높이를 100%로 설정 */
  box-sizing: border-box;
  background-color: #000000;
`;

// SpriteWrapper: 네모 테두리를 위한 wrapper
export const SpriteWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.5); /* 옅은 흰색 테두리 */
  box-sizing: border-box;
  background-color: #000000;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8); /* 호버 시 테두리 강조 */
  }
`;

// SpriteImage: 네모 안에 원형 이미지
export const SpriteImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain; /* 이미지가 잘리지 않고 원형으로 맞춰짐 */
`;
