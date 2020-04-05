import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
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

const Main = ({ navigation }) => {
  const [search, setSearch] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [searchFiltersIsVisible, setSearchFiltersIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState("activity");
  const [requestType, setRequestType] = useState(["drafts", "open"]);
  const {
    user: { id },
    requests
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequests(id));
  }, []);

  const onPressFilter = () => {
    setSearchFiltersIsVisible(!searchFiltersIsVisible);
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

        <CreateNewRequestHelper />

        <CreateNewRequestBtn onPress={() => {}} />
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
  }
});

export default Main;
