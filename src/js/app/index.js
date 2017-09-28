import { Navigation } from 'react-native-navigation';

import Welcome from './components/Welcome';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';

export default () => {
  Navigation.registerComponent('Welcome', () => Welcome);
  Navigation.registerComponent('Screen2', () => Screen2);
  Navigation.registerComponent('Screen3', () => Screen3);
  Navigation.registerComponent('Screen4', () => Screen4);

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'One',
        screen: 'Welcome',
        icon: require('./images/icon1.png'),
        selectedIcon: require('./images/icon1_selected.png'),
      },
    ]
  });

};
