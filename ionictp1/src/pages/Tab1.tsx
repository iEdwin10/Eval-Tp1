import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import NavigationButton from '../components/NavigationButton';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page d'Exemple</IonTitle>
        </IonToolbar>
      </IonHeader>

    
      <IonContent>
        <NavigationButton path="/tab2" text="Pokédex" />
        <NavigationButton path="/tab3" text="Film" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
