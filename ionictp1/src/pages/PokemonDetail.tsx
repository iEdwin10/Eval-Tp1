import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useState } from 'react';
import { useParams } from 'react-router';

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

const PokemonDetail: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  // Récupérer le nom du Pokémon depuis les paramètres de l'URL
  const { name } = useParams<{ name: string }>();

  useIonViewDidEnter(() => {
    const getData = async () => {
      try {
        const request = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${name}`);
        const data = await request.json();

        setTimeout(() => {
          setPokemon(data[0]); // S'assurer que data[0] est défini
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Oups, problème pendant la récupération des Pokémon', error);
        setLoading(false);
      }
    };

    getData();
  });

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle slot="start">Détails du Pokémon</IonTitle>
          <IonButtons slot="end">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <p>Chargement en cours...</p>}
        {!loading && !pokemon && <p>Erreur : Pokémon non trouvé.</p>}
        {pokemon && (
          <>
            <IonTitle>{pokemon.name.en}</IonTitle>
            <IonItem>
              <img
                src={pokemon.sprites.regular}
                alt={pokemon.name.en}
                style={{ width: '150px', height: '150px' }}
              />
            </IonItem>
            <IonLabel>
              <h2>Types:</h2>
              {pokemon.types.map((type, index) => (
                <div key={index}>
                  <img src={type.image} alt={type.name} style={{ width: '50px', height: '50px' }} />
                  <span>{type.name}</span>
                </div>
              ))}
            </IonLabel>
            <IonLabel>
              <h2>Catégorie:</h2>
              <p>{pokemon.category}</p>
            </IonLabel>
            <IonLabel>
              <h2>Taille:</h2>
              <p>{pokemon.height}</p>
            </IonLabel>
            <IonLabel>
              <h2>Poids:</h2>
              <p>{pokemon.weight}</p>
            </IonLabel>
            <IonLabel>
              <h2>Groupes d'œufs:</h2>
              <p>{pokemon.egg_groups.join(', ')}</p>
            </IonLabel>
            <IonLabel>
              <h2>Taux de capture:</h2>
              <p>{pokemon.catch_rate}</p>
            </IonLabel>
            <IonLabel>
              <h2>Niveau 100:</h2>
              <p>{pokemon.level_100}</p>
            </IonLabel>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetail;
