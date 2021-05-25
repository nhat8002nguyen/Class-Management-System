import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function SelectComponent({
  items,
  checked,
  onChecked,
  iconSize,
  iconColor,
  style,
  multipleChoose,
  onCheckLast
}) {
  const [selection, setSelection] = useState(checked ? checked : []);
  const handleOnClick = (item, index) => {
    if(index === items.length - 1) {
      onCheckLast()
    }
    if (!selection.some((current) => current === item.key)) {
      if(multipleChoose){
        setSelection([...selection, item.key]);
        onChecked([...selection, item.key]);
      }else{
        setSelection([item.key]);
        onChecked([item.key]);
      }

    } else {
      if(multipleChoose){
        let selectionAfterRemoval = selection;
        selectionAfterRemoval = selectionAfterRemoval.filter(
          (current) => current !== item.key,
        );
        setSelection([...selectionAfterRemoval]);
        onChecked([...selectionAfterRemoval]);
      }

    }

  };

  const isItemInSelection = (item) => {
    if (selection.some((current) => current === item.key)) {
      return true;
    }
    return false;
  };

  return items.map((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.checkboxContainer, {...style}]}
        onPress={() => handleOnClick(item, index)}
        activeOpacity={0.7}>
        <View style={styles.checked}>
          <FontAwesome name = {isItemInSelection(item)? "circle": "circle-o"} size={iconSize || 20}
              color={iconColor || 'white'}/>
        </View>
        <Text style={styles.label}>{item.value}</Text>
      </TouchableOpacity>
    );
  });
}

export default SelectComponent;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});