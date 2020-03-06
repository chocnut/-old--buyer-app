import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ChatMessage from './ChatMessage';
import ChatDateTimeSeparator from './ChatDateTimeSeparator';

const Chat = (props) => {
    const chatMessage = (item) => {
        return (
            item.type == 'separator' ? <ChatDateTimeSeparator title={item.date}/> : <ChatMessage item={item}/>
        )
    }

    const data = [];
    props.data.map((item, index, array) => {
        if (index > 0) {
            let prevItem = array[index - 1];

            if (prevItem.userName != item.userName) {
                prevItem.lastInGroup = true;
            }

            if (index == array.length - 1) {
                item.lastInGroup = true;
            }

            if (prevItem.date != item.date) {
                data.push({
                    type: 'separator',
                    date: item.date,
                })
            }
        }
        data.push(item);
    });

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
