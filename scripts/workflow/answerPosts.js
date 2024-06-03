const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.DISCOURSE_API_KEY;
const API_USERNAME = process.env.DISCOURSE_API_USERNAME;
const BASE_URL = process.env.DISCOURSE_BASE_URL;

const fetchTopics = async () => {
  const url = `${BASE_URL}/latest.json?api_key=${API_KEY}&api_username=${API_USERNAME}`;
  try {
    const response = await axios.get(url);
    return response.data.topic_list.topics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

const fetchTopicDetails = async (topicId) => {
  const url = `${BASE_URL}/t/${topicId}.json?api_key=${API_KEY}&api_username=${API_USERNAME}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    return null;
  }
};

const sendReply = async (topicId, message) => {
  const url = `${BASE_URL}/posts.json`;
  const payload = {
    topic_id: topicId,
    raw: message,
    api_key: API_KEY,
    api_username: API_USERNAME,
  };
  try {
    await axios.post(url, payload);
    console.log(`Reply sent to topic ${topicId}`);
  } catch (error) {
    console.error(`Error sending reply to topic ${topicId}:`, error);
  }
};

const run = async () => {
  const topics = await fetchTopics();
  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);

  console.log('Topics:', topics.length);
  for (const topic of topics) {
    const createdAt = new Date(topic.created_at);
    console.log('Topic:', topic.id, 'Created At:', createdAt);
    if (createdAt >= oneWeekAgo) {
      const topicDetails = await fetchTopicDetails(topic.id);
      console.log('Topic:', topic.id);
      console.log('Details:', topicDetails);
      if (
        topicDetails &&
        topicDetails.post_stream &&
        topicDetails.post_stream.stream.length === 1
      ) {
        const message =
          'This is an automated reply to a topic with no replies in the last 24 hours.';
        console.log('Sending reply to topic:', topic.id);
        // await sendReply(topic.id, message);
      }
    }
  }
};

run();
