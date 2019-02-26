import {
  //CREATE_CHANNEL,
  CHANNELS_QUERY,
  GET_MESSAGES
  //SEND_MESSAGE
} from "./Queries";

export const defaults = {
  channelList: [
    {
      id: 1,
      channelName: "Public",
      __typename: "channels"
    }
  ],
  messages: []
};

//let channelId = 2;
export const resolvers = {
  Mutation: {
    CreateChannel: (_, variables, { cache }) => {
      const prevData = cache.readQuery({ query: CHANNELS_QUERY });

      const payload = {
        id: prevData.channelList.length + 1,
        channelName: variables.channelName,
        __typename: "channels"
      };

      const data = {
        channelList: prevData.channelList.concat([payload])
      };

      cache.writeQuery({
        query: CHANNELS_QUERY,
        data
      });
      return null;
    },
    SendMessage: (_, variables, { cache }) => {
      console.log(variables);
      const prevData = cache.readQuery({
        query: GET_MESSAGES,
        variables: { innerChannelId: variables.innerChannelId }
      });
      console.log("prev:", prevData);
      const payload = {
        nickname: variables.nickname,
        contents: variables.contents,
        createdAt: Date.now(),
        innerChannelId: variables.innerChannelId,
        __typename: "message"
      };

      const data = {
        messages: prevData.messages.concat([payload])
      };

      cache.writeQuery({
        query: GET_MESSAGES,
        variables: {
          innerChannelId: variables.innerChannelId
        },
        data
      });
      console.log("after:", data);
      return null;
    }
  }
};
