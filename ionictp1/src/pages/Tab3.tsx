import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import React, { useEffect, useState } from 'react';


// Définition du type Pokémon
type Movie = {
  original_title : string;
  release_date : string;
  poster_path: string;
  overview : string;

};

const Tab3: React.FC = () => {
  const [movies, setMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch('http://movies-api.julienpoirier-webdev.com/search/movies/:query');
        const data = await response.json();

        setTimeout(() => {
        setMovie(data);
        setLoading(false);
        }, 2000);
      } catch (error) {
          console.log(error, 'Chargement des resources');
      }
    };

    fetchMovie();
  }, []);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Chargement des films</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Loading...</p>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Film</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader>
          <IonSearchbar placeholder="Tapez le nom du film"></IonSearchbar>
        </IonHeader>
        
        <IonCard>
          <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
              <IonCardTitle><h1></h1></IonCardTitle>
              <IonCardSubtitle><p>Card Subtitle</p></IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Here's a small text description for the card content. Nothing more, nothing less.</p>
            </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
