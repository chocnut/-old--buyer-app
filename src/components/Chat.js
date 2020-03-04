import React from 'react';
import { View, FlatList, Text } from 'react-native';

import ChatMessage from './ChatMessage';
import ChatDateTimeSeparator from './ChatDateTimeSeparator';

const Chat = (props) => {
    const chatDateTimeSeparator = (item) => {
        return item.date ? <ChatDateTimeSeparator title={item.date}/> : false
    }
    const chatMessage = (item) => {
        return (
            <View>
                {chatDateTimeSeparator(item)}
                <ChatMessage item={item}/>
            </View>
        )
    }

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => chatMessage(item)}
            keyExtractor={(item, index) => index.toString()}
        >
        </FlatList>
    );
}

export default Chat;
