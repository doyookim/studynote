/**
 * 배열 데이터를 탐색하면서 배열의 원소 단위로 컴포넌트를 분리한 케이스
 */

import React from "react";
import styled from "styled-components";
import NewsData from "../NewsData";
import NewsItem from "./NewsItem";

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const NewsList = () => {
  console.clear();
  return (
    <div>
      <ListContainer>
        {NewsData.map((v, i) => (
          <NewsItem key={i} item={v} />
        ))}
      </ListContainer>
    </div>
  );
};

export default NewsList;
