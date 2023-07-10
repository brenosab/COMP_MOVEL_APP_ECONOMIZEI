import { Pressable, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Feather } from '@expo/vector-icons';
const Header = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.rowHeader]}>
                <View style={{flex: 1, backgroundColor: '#675BF3' }}>
                    <Pressable style={[styles.buttonPerfil]} onPress={() => { }}>
                        <View style={[styles.column]}>
                            <Feather style={styles.menuIcon} name='user' size={12} color="black" />
                        </View>
                        <View style={[styles.column]}>
                            <Text style={[styles.textPerfil]}>Perfil</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ flex: 4, backgroundColor: '#675BF3'}}>
                    <Text
                        style={styles.getStartedText}>
                        Economizei pra Gastar
                    </Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#675BF3' }}>
                    <Pressable style={styles.buttonSave} onPress={() => { }}>
                        <Text style={styles.text}>$</Text>
                        <Text style={styles.textMin}>p/</Text>
                        <Text style={styles.text}>G</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
const dimScreen= Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: dimScreen.width,
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#675BF3',
        padding: 3,
    },
    getStartedText: {
        lineHeight: 24,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'normal',
        color: 'white',
        margin: 0, 
        padding:0
    },
    buttonPerfil: {
        flexDirection: 'column',
        padding: 5,
        margin: 3,
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        backgroundColor: '#E4D2FC',
        borderRadius: 100,
        borderColor: '#868686',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    buttonSave: {
        flexDirection: 'row',
        width: 55,
        height: 55,
        padding: 3,
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        backgroundColor: '#770DFF',
        borderRadius: 100,
        borderColor: '#868686',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    text: {
        fontSize: 24,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        paddingTop: 3,
        color: 'white',
    },
    textMin: {
        fontSize: 8,
        padding: 2,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    textPerfil: {
        flex: 1,
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'normal',
        letterSpacing: 0.25,
        color: 'black',
    },
    menuIcon: {
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 5,
        padding: 3,
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E4D2FC',
    },
});

export default Header;