import axios from "axios";
import { selectFields } from "../utils/selectFields";

export const baseUrl = "https://hacker-news.firebaseio.com/v0";
export const newStoriesUrl = `${baseUrl}/newstories.json`;
export const storyUrl = `${baseUrl}/item/`;

export const getStory = async storyId => {
  const response = await axios.get(`${storyUrl + storyId}.json`);
  if (response.status === 200) return selectFields(response.data);
};

export const getStoryIds = async () => {
  const response = await axios.get(newStoriesUrl);
  if (response.status === 200) return response.data;
};
