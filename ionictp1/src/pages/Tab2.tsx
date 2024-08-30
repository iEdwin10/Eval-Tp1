import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButton,
  IonImg
} from '@ionic/react';
import './Tab2.css';
import DetailButton from '../components/DetailButton';

// Définition du type Pokémon
type Pokemon = {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
    gmax: string | null;
  };
  types: {
    name: string;
    image: string;
  }[];

  height: string;
  weight: string;
  egg_groups: string[];
  sexe: {
    male: number;
    female: number;
  };
  catch_rate: number;
  level_100: number;
  formes: any;
};

const Tab2: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
        const data = await response.json();

        setTimeout(() => {
        setPokemons(data);
        setLoading(false);
        }, 2000);
      } catch (error) {
          console.log(error, 'Oups, prb pdt la récup des characters');
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Pokémon List</IonTitle>
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
          <IonTitle>Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonList>
          {pokemons.map(pokemon => (
            <IonItem key={pokemon.name.en}>
              <IonAvatar slot="start">
                <IonImg src={pokemon.sprites.regular} />
              </IonAvatar>
              <IonLabel>
                <h2>{pokemon.name.fr}</h2>
                <p>{pokemon.category}</p>
                <p>Taille: {pokemon.height}</p>
                <p>Poids : {pokemon.weight}</p>
                <p>
                  Types: {pokemon.types && pokemon.types.length > 0 // J'ai du faire appel a ChatGtP car j'avais du mal a afficher le types des pokemon comme le nom et la catégoie au final c'est parce que la'info se trouvait dans un tableau composé, Le Unknow a été utilisé pour set une donnée vide pour le cas de MissingNo.
                    ? pokemon.types.map((type) => type.name).join(', ')
                    : 'Unknown'}  
                </p>            
              </IonLabel>
              <DetailButton pokemon={pokemon}/>
            </IonItem> // Utilisation au dessus du component DetailButtton 
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
