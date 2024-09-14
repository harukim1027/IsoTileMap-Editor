import styled from "styled-components";

export const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #000000;
`;

export const SpritesSection = styled.div`
  width: 40%;
  background-color: #000000;
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 1); /* 오른쪽에 그림자 추가 */
`;

export const MapEditorSection = styled.div`
  width: 100%;
  padding: 0px;
  background-color: #000000;
  display: flex;
`;
