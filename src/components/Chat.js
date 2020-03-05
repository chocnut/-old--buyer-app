import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ChatMessage from './ChatMessage';
import ChatDateTimeSeparator from './ChatDateTimeSeparator';

const Chat = (props) => {
    const chatDateTimeSeparator = (item) => {
        return item.date && !item.hideDateSeparator ? <ChatDateTimeSeparator title={item.date}/> : false
    }
    const chatMessage = (item) => {
        return (
            <View>
                {chatDateTimeSeparator(item)}
                <ChatMessage item={item}/>
            </View>
        )
    }

    const data = props.data.map((item, index, array) => {
        if (index > 0) {
            let prevItem = array[index - 1];

            if (prevItem.userName != item.userName) {
                prevItem.lastInGroup = true;
            }

            if (index == array.length - 1) {
                item.lastInGroup = true;
            }

            if (prevItem.date == item.date) {
                item.hideDateSeparator = true;
            }
        }
        return item;
    })

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => chatMessage(item)}
            keyExtractor={(item, index) => index.toString()}
            style={[styles.flatList, props.style]}
        >
        </FlatList>
    );
}

const styles = StyleSheet.create({
    flatList: {
        marginVertical: 10,
    }
});

export default Chat;
