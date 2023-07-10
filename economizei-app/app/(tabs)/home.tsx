import { StyleSheet, StatusBar } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { SafeAreaView } from 'react-native';
import TabLayout from '../home/_layout';

export default function TabHomeScreen() {
  return (
    <SafeAreaView style={styles.area}>
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <TabLayout />
      </View>
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "#22252D",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
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
