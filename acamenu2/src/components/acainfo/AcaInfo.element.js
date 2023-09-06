import styled from 'styled-components';

export const BodyContainer = styled.main`
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  
`;

export const InfoText = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
`;

/* 테이블 목차 스타일 */
export const TableOfContents = styled.ul`
  list-style-type: none; /* 목차 스타일 제거 */
  padding-left: 20px; /* 들여쓰기 제거 */
`;

export const CustomButton = styled.button`
  background-image: linear-gradient(45deg, #9370DB 30%, #0288d1 90%);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.0); /* 그림자 스타일 및 투명도 조절 */
  transition: box-shadow 0.3s ease; /* 그림자 변화에 부드러운 효과 추가 */

  &:hover {
    background-color: #6A5ACD;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4); /* 마우스를 올렸을 때 그림자 효과 증가 */
  }
`;