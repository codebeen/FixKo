import { FontAwesome } from '@expo/vector-icons';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SearchBar() {
    return (

        <View style={styles.asembler }>
            <View style={styles.Main}>
                <TextInput style={styles.Input} placeholder="What do you need help with?" />
                
            </View>

            <View style={styles.searchButton}>
                <TouchableOpacity>
                    <FontAwesome style={styles.icon} name="search" size={25} />
                </TouchableOpacity>


            </View>

        </View>
            
    )
}

const styles = StyleSheet.create({
    asembler: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },

    Main: {
        backgroundColor: '#fff',
        width:250,
        height: 45,
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
    },

    Input: {
        marginLeft: 10,
        marginTop: 5,
        color: '#676D75',

    },

    searchButton: {
        height: 45,
        width: 55,
        backgroundColor: '#0037B7',
        borderWidth: 1,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
        borderColor: '#0037B7',
        alignItems: 'center',
        justifyContent: 'center',

    },

    icon: {
        color: '#fff',

    }




})