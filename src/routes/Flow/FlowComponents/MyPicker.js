import {Text, View, TouchableOpacity, StyleSheet, Picker} from "react-native"
import React from "react"

const MyPicker = props => {
    let pickerElements = [];
    for (let i = 0; i <= props.myPickerItemCount; i++) {
        pickerElements.push(<Picker.Item label={i + " " + props.myPickerLabelName} value={i} key={i} />);
    }
    return (
        <View style={{flex:1}}>
            <Picker
                itemStyle={{fontSize:13}}
                selectedValue={props.myPickerValue}
                style={{width: '100%'}}
                onValueChange={props.myPickerHandle}>
                {pickerElements}
            </Picker>
        </View>
    )
};


export default MyPicker;