import React from "react";
import { act } from "react-dom/test-utils";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { storyIds, singularStory } from "../fixtures";
import { getStory, getStoryIds } from "../services/hnApi";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants";
import { StoriesContainer } from "../containers/StoriesContainer";

beforeEach(cleanup);

jest.mock("../hooks/useInfiniteScroll.js");

jest.mock("../services/hnApi", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

test("should render the application", async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));

  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  await act(async () => {
    const { getByText, queryByTestId } = render(<StoriesContainer />);
    await waitForElement(() => [
      expect(getByText("HackerNews")).toBeTruthy(),
      expect(getByText("Tarnished: Google Responds")).toBeTruthy(),
      expect(queryByTestId("story-by").textContent).toEqual("By:Karl Hadwen"),
    ]);
  });
});
