import React from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import colors from "../../constants/Colors";
import Header from "../../components/Header";
import CreateNewRequestHelper from "../../components/CreateNewRequestHelper";
import CreateNewRequestBtn from "../../components/CreateNewRequestBtn";

import SearchFilteBtn from "../../components/SearchFilteBtn"
import SearchInput from "../../components/SearchInput"
import SearchFilterModal from "../../components/SearchFilterModal"
import CheckboxGroup from "../../components/CheckboxGroup"
import RadioButtonGroup from "../../components/RadioButtonGroup"

export default class MainScreen extends React.Component {
  state = {
    search: "",
    filterActive: false,
    searchFiltersIsVisible: false,

    sortBy: "activity",
    requestType: [
      "drafts",
      "open"
    ]
  };

  onPressFilter = () => {
    this.setState({searchFiltersIsVisible: !this.state.searchFiltersIsVisible})
  };

  render() {

    const searchFilterModal = () => {
      return (
        <SearchFilterModal
          title="Filters"
          allowClose={true}
          onChangeVisibility={(isVisible)=>{this.setState({searchFiltersIsVisible: isVisible})}}
          isVisible={this.state.searchFiltersIsVisible}>
  
          <Text style={[styles.modalLabel, styles.modalLabelFirst]}>Sort by</Text>
          <RadioButtonGroup
            selected={this.state.sortBy}
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
              },
            ]}
            onSelect={(selected)=>{
              this.setState({sortBy: selected});
            }}
          />
  
          <Text style={styles.modalLabel}>Request type</Text>
          <CheckboxGroup
            selected={this.state.requestType}
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
            onSelect={(selected)=>{
              this.setState({requestType: selected});
            }}
          />
        </SearchFilterModal>
      )
    }

    return(
      <View style={styles.container}>
        <Header
          onPressProfile={() => {}}
          onPressMessages={() => {}}
          notify={false}
        />
        <View style={styles.body}>
          <View style={styles.searchFilterContainer}>
            <SearchInput value={this.state.search} onChangeText={(value)=>{
              this.setState({search: value})
            }} />
            <SearchFilteBtn
              active={false}
              onPress={this.onPressFilter}
            />
            {searchFilterModal()}
          </View>

          <CreateNewRequestHelper />

          <CreateNewRequestBtn onPress={()=>{}} />
        </View>

      </View>
    )
  }
}

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
