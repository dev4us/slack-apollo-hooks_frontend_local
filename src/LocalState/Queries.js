import gql from "graphql-tag";

export const CREATE_CHANNEL = gql`
  mutation createChannel($channelName: String!) {
    CreateChannel(channelName: $channelName) @client
  }
`;

export const CHANNELS_QUERY = gql`
  {
    channelList @client {
      id
      channelName
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessage($innerChannelId: Int!) {
    messages(innerChannelId: $innerChannelId) @client {
      nickname
      contents
      createdAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $nickname: String!
    $contents: String!
    $innerChannelId: Int!
  ) {
    SendMessage(
      nickname: $nickname
      contents: $contents
      innerChannelId: $innerChannelId
    ) @client
  }
`;
