import React from "react"
import {View} from "react-native"
import Checkbox from "./Checkbox";

export default class CheckboxGroup extends React.Component {
  state = {
    selected: []
  }

  componentDidMount = () => {
    let selected = []

    this.props.items.map(item=>{
      if(item.selected) {
        selected.push(item.value)
      }
    })

    this.setState({selected: selected})
  }

  onSelect = (value) => {
    let selected = this.state.selected
    if(selected.indexOf(value) == -1){
      selected.push(value)
    } else {
      selected = selected.filter(i => i != value)
    }

    this.setState({
      selected: selected
    })

    this.props.onSelect ? this.props.onSelect(selected) : false
  }

  isSelected = (value) => {
    const selected = this.state.selected
    if(selected.indexOf(value) == -1){
      return 'unchecked'
    }
    return 'checked'
  }

  render() {
    return (
      <View>
        {this.props.items.map((item, index)=>{
          return <Checkbox
            onPress={()=>{this.onSelect(item.value)}}
            key={index}
            label={item.label}
            status={this.isSelected(item.value)}
          />
        })}
      </View>
    )
  }
}