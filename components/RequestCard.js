import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/Colors';
import moment from 'moment';
import FastImage from 'react-native-fast-image-expo'

export default class RequestCard extends React.Component {
    renderImage = (featured_image, sent_at) => {
        const source = featured_image ? { uri: featured_image.file_uri } : require('../assets/images/placeholder.png')
        return <FastImage style={[ styles.image, styles.placeholder ]} source={source} resizeMode={FastImage.resizeMode.cover}/>

    }

    renderSentIcon = (show) => {
        if (!show) return null
        return (
        <View style={styles.sent_icon} >
            <Image source={require('../assets/images/sent-icon.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
            <Text style={{ color: 'white', fontFamily: 'QuicksandBold', fontSize: 14 }}>SENT</Text>
        </View>
        )
    }

    renderDelete = () => {
        if (!this.props.allowDelete) return null
        return (
            <TouchableOpacity activeOpacity={1} style={styles.deleteBtn} onPress={() => this.props.delete(this.props.request.id)}>
                <Image style={styles.deleteBtnImg} source={require('../assets/images/delete.png')}/>
            </TouchableOpacity>
        )
    }

    render() {
        const { title, updated_at, sent_at } = this.props.request.attributes
        let featured_image = null
        if (this.props.media && this.props.media.length) {
            featured_image = this.props.media[0].attributes
        }

        return (
            <TouchableOpacity style={[ styles.card, sent_at && styles.sent ]} onPress={() => this.props.onPress(this.props.request)} activeOpacity={1}>
                <View style={styles.container}>
                    { this.renderSentIcon(sent_at) }
                    { this.renderImage(featured_image, sent_at) }
                    { this.renderDelete() }
                    <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>{ title }</Text>
                    <Text style={styles.description}>{ moment(updated_at).format('DD MMM YYYY') }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: "#555064",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        margin: 6,
        marginBottom: 14,
        borderRadius: 4
    },
    sent: {
        backgroundColor: '#fff',
    },
    container: {
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative'
    },
    placeholder: {
        backgroundColor: '#f4f4f4',
    },
    image: {
        width: '100%',
        height: 130,
        backgroundColor: '#fff'
    },
    sent_icon: {
        position: 'absolute',
        backgroundColor: colors.graphiteSemiOpacity,
        top: 0,
        right: 0,
        zIndex: 5,
        width: '100%',
        height: 130,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'QuicksandBold',
        fontSize: 14,
        color: colors.graphite,
        padding: 10,
        paddingBottom: 2
    },
    description: {
        fontFamily: 'QuicksandMedium',
        fontSize: 13,
        color: colors.graphiteOpacity,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    deleteBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteBtnImg: {
        width: 9,
        height: 9
    }
  });
