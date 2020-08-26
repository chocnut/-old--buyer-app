import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { useDispatch, useSelector } from "react-redux";

import colors from "../../constants/Colors";
import Header from "../../components/Header";
import CreateNewRequestHelper from "../../components/CreateNewRequestHelper";
import CreateNewRequestBtn from "../../components/CreateNewRequestBtn";

import SearchFilterBtn from "../../components/SearchFilterBtn";
import SearchInput from "../../components/SearchInput";
import SearchFilterModal from "../../components/SearchFilterModal";
import CheckboxGroup from "../../components/CheckboxGroup";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import {
  getUserRequests,
  toggleInboxNewMessage
} from "../../redux/request/request.actions";

import Fire from "../../services/fire";

function RequestCard({
  status,
  item,
  title,
  media,
  navigation,
  createdAt,
  requestPublicId,
  userId,
  handleNotify,
  style
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const [threads, setThreads] = useState([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const dispatch = useDispatch();

  const getThreads = () => {
    Fire.shared.setRequestId(item.id);
    Fire.shared.off();
    Fire.shared.onThread(thread => {
      setThreads(prevThread => [...prevThread, thread]);
    });
  };

  const getUnreadMessage = () => {
    for (const thread of threads) {
      setUnreadMessageCount(0);
      Fire.shared.setPublicId(thread.threadUid);
      Fire.shared.off();
      Fire.shared.onAll(message => {
        if (Array.isArray(message.seen) && !message.seen.includes(userId)) {
          if (!item.isNewUnreadMessage) {
            handleNotify(true);
            dispatch(toggleInboxNewMessage());
          }
          setUnreadMessageCount(prev => prev + 1);
        }
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleNotify(false);
      getThreads();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    getUnreadMessage();
  }, [threads]);

  return (
    <View style={[styles.card, style]}>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate("RequestShow", {
              item,
              imgSrc: media,
              createdAt,
              requestPublicId
            })
          }
        >
          <View>
            {status === 1 && (
              <View style={styles.draftStatusContainer}>
                <Text style={styles.draftStatusText}>Draft</Text>
              </View>
            )}
            {status === 2 && (
              <View style={styles.newStatusContainer}>
                <Text style={styles.newStatusText}>New</Text>
              </View>
            )}
            <Image
              onLoad={() => setImageLoading(false)}
              style={{
                width: "100%",
                height: 130,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4
              }}
              key={Math.random(1000)}
              source={{
                uri: media
              }}
            ></Image>
            <ActivityIndicator
              style={{ display: !imageLoading ? "none" : "flex" }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 8,
          marginVertical: 8
        }}
      >
        <Text style={styles.title}>{title}</Text>
        {unreadMessageCount === 0 && (
          <Text style={styles.newMessageCount}>No new messages</Text>
        )}
        {unreadMessageCount > 0 && (
          <Text style={styles.newUnreadMessage}>
            {unreadMessageCount} new message{unreadMessageCount > 1 && "s"}
          </Text>
        )}
      </View>
    </View>
  );
}

const Main = ({ navigation }) => {
  const [search, setSearch] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [searchFiltersIsVisible, setSearchFiltersIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState("activity");
  const [requestType, setRequestType] = useState(["drafts", "open"]);
  const [isFetching, setIsFetching] = useState(false);
  const [isNotify, setIsNotify] = useState(false);

  const {
    user: { id },
    requests
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getUserRequests(id));
    });
  }, []);

  const onPressFilter = () => {
    setSearchFiltersIsVisible(!searchFiltersIsVisible);
  };

  const onRefresh = () => {
    dispatch(getUserRequests(id));
  };

  const filterRequest = value => {
    if (!value || !value.length) return requests.requests;

    return requests.requests.filter(request =>
      request.attributes.title.toLowerCase().match(value.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <Header
        onPressProfile={() => navigation.push("Profile")}
        onPressMessages={() => navigation.push("Inbox")}
        notify={isNotify}
      />
      <Spinner
        visible={requests.isRefreshing}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.body}>
        <View style={styles.searchFilterContainer}>
          <SearchInput
            value={search}
            onChangeText={value => {
              setSearch(value);
            }}
          />
          <SearchFilterBtn active={false} onPress={onPressFilter} />
          <SearchFilterModal
            title="Filters"
            allowClose={true}
            onChangeVisibility={isVisible =>
              setSearchFiltersIsVisible(isVisible)
            }
            isVisible={searchFiltersIsVisible}
          >
            <Text style={[styles.modalLabel, styles.modalLabelFirst]}>
              Sort by
            </Text>
            <RadioButtonGroup
              selected={sortBy}
              items={[
                {
                  label: "Activity",
                  value: "activity"
                },
                {
                  label: "Latest",
                  value: "latest"
                },
                {
                  label: "Oldest",
                  value: "oldest"
                }
              ]}
              onSelect={selected => setSortBy(selected)}
            />

            <Text style={styles.modalLabel}>Request type</Text>
            <CheckboxGroup
              selected={requestType}
              items={[
                {
                  label: "Drafts",
                  value: "drafts"
                },
                {
                  label: "Open",
                  value: "open"
                }
              ]}
              onSelect={selected => setRequestType(selected)}
            />
          </SearchFilterModal>
        </View>

        {Object.keys(requests.requests).length === 0 && (
          <CreateNewRequestHelper />
        )}
        {Object.keys(requests.requests).length > 0 && (
          <FlatList
            data={filterRequest(search)}
            numColumns={2}
            horizontal={false}
            renderItem={({ item, index }) => (
              <View style={{ flex: 0.5 }}>
                <RequestCard
                  style={index === 0 || index === 1 ? { marginTop: 20 } : {}}
                  navigation={navigation}
                  item={item}
                  title={item.attributes.title}
                  createdAt={item.attributes.created_at}
                  requestPublicId={item.attributes.public_id}
                  media={item.attributes.featured_image_url}
                  status={item.attributes.status}
                  userId={id}
                  handleNotify={status => setIsNotify(status)}
                />
              </View>
            )}
            onRefresh={onRefresh}
            refreshing={isFetching}
            keyExtractor={item => item.attributes.public_id}
          />
        )}
        <CreateNewRequestBtn
          onPress={() => {
            navigation.navigate("NewRequest");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  body: {
    flex: 1
  },

  searchFilterContainer: {
    height: 46,
    paddingHorizontal: 16,
    alignItems: "stretch",
    backgroundColor: "white",
    flexDirection: "row"
  },

  modalLabel: {
    fontSize: 16,
    fontFamily: "Quicksand-Bold",
    color: colors.secondary,
    marginBottom: 12,
    marginTop: 20
  },
  modalLabelFirst: {
    marginTop: 0
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20
  },
  message: {
    fontFamily: "Quicksand-Regular",
    fontSize: 13,
    color: "#9996A2"
  },
  noNewMessageCount: {
    fontFamily: "Quicksand-Regular",
    fontSize: 13,
    color: "#F03758"
  },
  newMessageCount: {
    fontFamily: "Quicksand-Regular",
    fontSize: 13,
    color: "#9996A2"
  },
  title: {
    fontFamily: "Quicksand-Bold",
    fontSize: 14
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    borderWidth: 1,
    borderColor: "#F4F4F4",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  spinnerTextStyle: {
    color: "#FFF"
  },
  newUnreadMessage: {
    fontFamily: "Quicksand-Medium",
    fontSize: 13,
    color: "#F03758"
  },
  draftStatusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    position: "absolute",
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F4F4F4"
  },
  draftStatusText: {
    color: "#555064",
    textTransform: "uppercase",
    fontFamily: "Quicksand-Medium"
  },
  newStatusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    position: "absolute",
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F03758"
  },
  newStatusText: {
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontFamily: "Quicksand-Medium"
  }
});

export default Main;
