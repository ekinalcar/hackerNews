import React, { useState, useEffect, memo } from "react";
import { getStory } from "../services/hnApi";
import { mapTime } from "../mappers/mapTime";
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
  StoryMetaElement,
} from "../styles/StoryStyles";

export const Story = ({ storyId }) => {
  const [story, setStory] = useState({});

  const storyDetail = async () => {
    const response = await getStory(storyId);
    setStory(response);
  };

  useEffect(() => {
    storyDetail();
  }, []);

  return story && story.url ? (
    <StoryWrapper data-testid="story">
      <StoryTitle>
        <a href={story.url}>{story.title}</a>
      </StoryTitle>
      <StoryMeta>
        <span data-testid="story-by">
          <StoryMetaElement color="#000">By:{story.by}</StoryMetaElement>
        </span>
        <span data-testid="story-time">
          <StoryMetaElement color="#000">Posted:</StoryMetaElement>
          {` `}
          {mapTime(story.time)}
        </span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
};
