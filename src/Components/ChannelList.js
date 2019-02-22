import React, { useEffect } from "react";
import { graphql, compose } from "react-apollo";
import styled from "styled-components";
import gql from "graphql-tag";

const LeftMenuFrame = styled.div`
  padding: 15px 15px 15px 15px;
  width: 250px;
  height: 100%;
  background: #4d394b;
`;

const Title = styled.div`
  width: 100%;
  height: 40px;
  font-weight: bold;
  color: white;
  font-size: 20px;
`;

const SubTitle = styled.div`
  width: 100%;
  height: 40px;
  color: #dcdcdc;
  font-size: 15px;
`;

const Channel = styled.div`
  width: 100%;
  height: 30px;
  color: #dcdcdc;
  font-size: 15px;
  cursor: pointer;
`;

const CHANNELS_QUERY = gql`
  query {
    GetChannel {
      channels {
        channelName
      }
    }
  }
`;

const CHANNELS_SUBSCRIPTION = gql`
  subscription CreateChannelSubscription {
    CreateChannelSubscription {
      channelName
    }
  }
`;

const ChannelList = ({ getChannelQuery }) => {
  const subscribeToNewChannel = () => {
    getChannelQuery.subscribeToMore({
      document: CHANNELS_SUBSCRIPTION,
      updateQuery: (prevData, { subscriptionData }) => {
        return {
          GetChannel: {
            channels: [
              ...prevData.GetChannel.channels,
              subscriptionData.data.CreateChannelSubscription
            ],
            __typename: prevData.GetChannel.__typename
          }
        };
      }
    });
  };

  useEffect(() => subscribeToNewChannel(), []);

  return (
    <>
      <LeftMenuFrame>
        <Title>Slack-Apollo-hooks</Title>
        <SubTitle>Channel</SubTitle>
        {!getChannelQuery.loading &&
          getChannelQuery.GetChannel.channels.map((channel, index) => (
            <Channel key={index}># {channel.channelName}</Channel>
          ))}
      </LeftMenuFrame>
    </>
  );
};

export default compose(graphql(CHANNELS_QUERY, { name: "getChannelQuery" }))(
  ChannelList
);