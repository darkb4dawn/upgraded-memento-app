import { StyleSheet, View, Text, Pressable } from 'react-native';

function JournalItem(props) {
return (
<View style={styles.journalItem}>
<Pressable
android_ripple={{ color: '#210644' }}
onPress={props.onDeleteItem.bind(this, props.id)}
style={({ pressed }) => pressed && styles.pressedItem}
>
<Text style={styles.journalText}>{props.text}</Text>
</Pressable>
</View>
);
}

export default JournalItem;

const styles = StyleSheet.create({
journalItem: {
marginTop: 5,
borderRadius: 6,
backgroundColor: '#FDDEB2',
},
pressedItem: {
opacity: 0.5,
},
journalText: {
color: '#210644',
padding: 8,
},
});
