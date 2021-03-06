export const typeDefs = `
type Channel {
  id: Int!
  channelName: String!
  messages: [Message]
  createdAt: String!
  updatedAt: String
}

type CreateChannelResponse {
  ok: Boolean!
  error: String
}

type Mutation {
  CreateChannel(channelName: String!): CreateChannelResponse!
  SendMessage(nickname: String!, contents: String!, innerChannelId: Int!): SendMessageResponse!
}

type Subscription {
  CreateChannelSubscription: Channel
  CreateMessageSubscription: Message
}

type GetChannelResponse {
  ok: Boolean!
  error: String
  channels: [Channel]
}

type Query {
  GetChannel: GetChannelResponse!
  GetMessage(innerChannelId: Int!): GetMessageResponse!
}

type GetMessageResponse {
  ok: Boolean!
  error: String
  messages: [Message]
}

type Message {
  id: Int!
  nickname: String!
  contents: String!
  innerChannel: Channel!
  innerChannelId: Int!
  createdAt: String!
  updatedAt: String
}

type SendMessageResponse {
  ok: Boolean!
  error: String
}
`;
