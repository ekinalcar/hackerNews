import React, { useEffect, useState } from "react";
import { getStoryIds } from "../services/hnApi";
import { Story } from "../components/Story";
import {
  GlobalStyle,
  StoriesContainerWrapper,
} from "../styles/StoriesContainerStyles";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([]);
  const { count } = useInfiniteScroll();

  const ids = async () => {
    const response = await getStoryIds();
    setStoryIds(response);
  };

  useEffect(() => {
    ids();
  }, []);

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>HackerNews</h1>
        {storyIds.slice(0, count).map(storyId => (
          <Story key={storyId} storyId={storyId} />
        ))}
      </StoriesContainerWrapper>
    </>
  );
};
