const axios = require('axios');
const dotenv = require('dotenv');
const {connect, sendMessage} = require('fireawai-node-sdk');
const {htmlToText} = require('html-to-text');

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

const getTextFromPost = (post) => {
  const text = htmlToText(post.cooked, {
    wordwrap: false,
    ignoreHref: true,
    ignoreImage: true,
    preserveNewlines: true,
  });
  return text;
};

const sendQueryToFireawai = async (query) => {
  try {
    await connect();
    return sendMessage(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const sendReply = async (topicId, message) => {
  const url = `${BASE_URL}/posts.json`;
  const payload = {
    topic_id: topicId,
    raw: message,
  };
  try {
    await axios.post(url, payload, {
      headers: {
        'Api-Key': API_KEY,
        'Api-Username': API_USERNAME,
        'Content-Type': 'application/json',
      },
    });
    console.log(`Reply sent to topic ${topicId}`);
  } catch (error) {
    console.error(`Error sending reply to topic ${topicId}:`, error);
  }
};

const run = async () => {
  const topics = await fetchTopics();
  const now = new Date();
  const oneDayAgo = new Date(now);
  oneDayAgo.setDate(now.getDate() - 1);

  for (const topic of topics) {
    const createdAt = new Date(topic.created_at);
    if (createdAt >= oneDayAgo) {
      const topicDetails = await fetchTopicDetails(topic.id);
      console.log('Processing topic:', topic.id, topic.title);

      if (topicDetails) {
        const hasApiUserReplied = topicDetails.post_stream.posts.some(
          (post) => post.username === API_USERNAME
        );

        if (hasApiUserReplied) {
          console.log('Topic has already been replied to. Skipping...');
          continue;
        }

        const postBody = getTextFromPost(topicDetails.post_stream.posts[0]);
        console.log('Sending query to Fireawai:', postBody);
        const resp = await sendQueryToFireawai(postBody);
        let reply =
          resp.message && resp.message.message && resp.message.message.content;

        console.log('Response from Fireawai:', reply);

        if (reply) {
          reply += `\n\n---

*Edgio Answers may provide inaccurate information and should be verified. Consult our [official documentation](https://docs.edgio.io) for more information.*`;

          await sendReply(topic.id, reply);
        }
      }
    }
  }
};

run();
