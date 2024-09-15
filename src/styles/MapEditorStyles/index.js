import styled from "styled-components";

export const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #000000;
`;

export const SpritesSection = styled.div`
  width: 35%;
  background-color: #000000;
  display: flex;

  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 1);
`;

export const MapEditorSection = styled.div`
  width: 100%;
  padding: 0px;
  background-color: #000000;
  display: flex;
`;
