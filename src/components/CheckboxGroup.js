import React from "react"
import {View} from "react-native"
import Checkbox from "./Checkbox";

const CheckboxGroup = ({ items, selected, onSelect }) => {

  const onPress = (value) => {
    if(selected.indexOf(value) == -1){
      selected.push(value)
    } else {
      selected = selected.filter(i => i != value)
    }

    onSelect(selected)
  }

  const isSelected = (value) => {
    if(selected.indexOf(value) == -1){
      return 'unchecked'
    }
    return 'checked'
  }

  return (
    <View>
      {items.map((item, index)=>{
        return <Checkbox
          onPress={()=>{onPress(item.value)}}
          key={index}
          label={item.label}
          status={isSelected(item.value)}
        />
      })}
    </View>
  )
}
export default CheckboxGroup;
