import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

//imports screens from each file to stacknavigator for navigation
import HomeScreen from './Home.js';
import AntibioticsScreen from './Antibiotics.js';
import IllnessesScreen from './Illnesses.js';
import QuestionsScreen from './Questions.js';
import ClinicsInfoScreen from './Clinics_Info.js';
import TitleVIScreen from './TitleVI.js';
import BackgroundScreen from './Background.js';
import ResourcesScreen from './Resources.js';
import AntibioticsUsageScreen from './Antibiotics_Usage.js';
import ImproperUsageScreen from './Improper_Usage.js';
import ProperUsageScreen from './Proper_Usage.js';
import AntibioticsInfoScreen from './Antibiotics_Info.js';
import IllnessesInfoScreen from './Illnesses_Info.js';
import OralHealthScreen from './Oral_Health.js';
import DiseasesScreen from './Diseases.js';
import DiseasesInfoScreen from './Diseases_Info.js';
import GoodHygieneScreen from './Good_Hygiene.js';
import DentistsInfoScreen from './Dentists_Info.js';
import FactsScreen from './Facts.js';
import TeethGumScreen from './Teeth&Gum.js';
import OftenDentistScreen from './OftenDentist.js';
import GeneralHealthScreen from './General_Health.js';
import ContactScreen from './Contact.js';
import NotificationsScreen from './Notifications.js';
import ClinicsScreen from './Clinics.js';
import DentistsScreen from './Dentists.js';

//makes the stacknavigator which allows for buttons to navigate different screens based on function
const AppNavigator = createStackNavigator(
  //binds screens to navigation name to allow buttons to go to that screen
  {
    "Home": HomeScreen,
    "Antibiotics": AntibioticsScreen,
    "Illnesses": IllnessesScreen,
    "Questions for your Doctor": QuestionsScreen,
    "Medical Clinics": ClinicsInfoScreen,
    "Title VI": TitleVIScreen,
    "Background": BackgroundScreen,
    "Resources": ResourcesScreen,
    "Antibiotics_Usage": AntibioticsUsageScreen,
    "Improper_Usage": ImproperUsageScreen,
    "Proper_Usage": ProperUsageScreen,
    "Antibiotics_Info": AntibioticsInfoScreen,
    "Illnesses_Info": IllnessesInfoScreen,
    "Oral Health": OralHealthScreen,
    "Diseases": DiseasesScreen,
    "Diseases_Info": DiseasesInfoScreen,
    "Steps for Good Hygiene": GoodHygieneScreen,
    "Dentist Locations": DentistsInfoScreen,
    "Facts": FactsScreen,
    "Teeth and Gum Care Overview": TeethGumScreen,
    "How often to the Dentist": OftenDentistScreen,
    "General Health": GeneralHealthScreen,
    "Contact Us": ContactScreen,
    "Notifications": NotificationsScreen,
    "Dentist List": DentistsScreen,
    "Medical Clinics List": ClinicsScreen
  },
  {
    //first screen to enter when opening the app
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);