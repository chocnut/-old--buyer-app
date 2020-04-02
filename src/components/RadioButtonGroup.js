import React from "react"
import {View} from "react-native"
import RadioButton from "./RadioButton";

const RadioButtonGroup = ({ items, selected, onSelect }) => {

  const onPress = (value) => {
    if (value === selected) {
        return
    }

    selected = value

    onSelect(value)
  }

  const isSelected = (value) => {
    if(selected !== value) {
      return 'unchecked'
    }
    return 'checked'
  }

  return (
    <View>
      {items.map((item, index)=>{
        return <RadioButton
          onPress={()=>{onPress(item.value)}}
          key={index}
          label={item.label}
          status={isSelected(item.value)}
        />
      })}
    </View>
  )
}
export default RadioButtonGroup;

// export default class RadioButtonGroup extends React.Component {
//   state = {
//     selected: ''
//   }

//   componentDidMount = () => {
//     let selected = this.props.items.find(item=>item.value === this.props.selected)
//     if (selected) {
//         this.setState({selected: selected.value})
//     } else {
//         this.onSelect(this.props.items[0].value)
//     }
//   }

//   onSelect = (value) => {
//     const selected = this.state.selected
//     if (value === selected) {
//         return
//     }

//     this.setState({
//       selected: value
//     })

//     this.props.onSelect ? this.props.onSelect(value) : false
//   }

//   isSelected = (value) => {
//     const selected = this.state.selected
//     if(selected !== value) {
//       return 'unchecked'
//     }
//     return 'checked'
//   }

//   render() {
//     return (
//       <View>
//         {this.props.items.map((item, index)=>{
//           return <RadioButton
//             onPress={()=>{this.onSelect(item.value)}}
//             key={index}
//             label={item.label}
//             status={this.isSelected(item.value)}
//           />
//         })}
//       </View>
//     )
//   }
// }