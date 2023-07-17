import { StyleSheet, StatusBar, Dimensions } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import AddReceita from '../../pages/AddReceita';

export default function TabReceitaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cadastrar Receita</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={{ flex: 10 }}>
        <AddReceita id=''/>
      </View>
    </View>
  );
}
const dimScreen = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: dimScreen.width,
    height: dimScreen.height,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
