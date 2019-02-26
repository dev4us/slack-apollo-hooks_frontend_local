import {
  //CREATE_CHANNEL,
  CHANNELS_QUERY
  //GET_MESSAGES,
  //SEND_MESSAGE
} from "./Queries";

export const defaults = {
  channelList: [
    {
      id: 1,
      channelName: "Public",
      __typename: "channels"
    }
  ]
};

let channelId = 2;
export const resolvers = {
  Mutation: {
    CreateChannel: (_, variables, { cache }) => {
      const query = CHANNELS_QUERY;
      const prevData = cache.readQuery({ query });
      console.log("prevData:", prevData);

      const payload = {
        id: channelId++,
        channelName: variables.channelName,
        __typename: "channels"
      };

      const data = {
        channelList: prevData.channelList.concat([payload])
      };

      console.log("afterData:", data);

      cache.writeQuery({
        query: CHANNELS_QUERY,
        data
      });
      return null;
    },
    SendMessage: () => {}
  }
};
