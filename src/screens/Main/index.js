import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
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
import { getUserRequests } from "../../redux/request/request.actions";
import { fetchMedias } from "../../services/request";

function RequestCard({
  item,
  title,
  media,
  navigation,
  createdAt,
  requestPublicId
}) {
  const [imgSrc, setImgSrc] = useState(undefined);

  const fetchImages = async () => {
    const response = await fetchMedias(media);
    setImgSrc(response);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <View style={styles.card}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate("RequestShow", {
              item,
              imgSrc,
              createdAt,
              requestPublicId
            })
          }
        >
          <Image
            style={{
              width: 164,
              height: 130
            }}
            key={Math.random(1000)}
            source={{
              uri: imgSrc
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 8,
          marginVertical: 8
        }}
      >
        <Text style={styles.title}>{`${title.substring(0, 13)}...`}</Text>
        <Text style={styles.newMessageCount}>1 new messages</Text>
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

  const {
    user: { id },
    requests
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequests(id));
  }, []);

  useEffect(() => {
    console.log("refreshing", requests.isRefreshing);
    setIsFetching(requests.isRefreshing);
  }, [requests.isRefreshing]);

  const onPressFilter = () => {
    setSearchFiltersIsVisible(!searchFiltersIsVisible);
  };

  const onRefresh = () => {
    dispatch(getUserRequests(id));
  };

  return (
    <View style={styles.container}>
      <Header
        onPressProfile={() => navigation.push("Profile")}
        onPressMessages={() => navigation.push("Chat")}
        notify={false}
      />
      <View style={styles.body}>
        <View style={styles.searchFilterContainer}>
          <SearchInput
            value={search}
            onChangeText={value => setSearch(value)}
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
          <SafeAreaView
            style={{
              marginHorizontal: 16
            }}
          >
            <FlatList
              data={requests.requests}
              numColumns={2}
              renderItem={({ item }) => (
                <RequestCard
                  navigation={navigation}
                  item={item}
                  title={item.attributes.title}
                  createdAt={item.attributes.created_at}
                  requestPublicId={item.attributes.public_id}
                  media={item.relationships.media.links.related}
                />
              )}
              onRefresh={onRefresh}
              refreshing={isFetching}
              keyExtractor={item => item.attributes.public_id}
            />
          </SafeAreaView>
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
  newMessageCount: {
    fontFamily: "Quicksand-Regular",
    fontSize: 13,
    color: "#F03758"
  },
  title: {
    fontFamily: "Quicksand-Bold",
    fontSize: 14
  },
  card: {
    width: 164,
    height: 182,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(85, 80, 100, 0.2)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5.5,
    borderWidth: 1,
    borderColor: "#F4F4F4",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginHorizontal: 15,
    marginTop: 15
  }
});

export default Main;
