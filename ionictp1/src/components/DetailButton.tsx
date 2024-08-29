import React from 'react';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

type DetailButtonProps = {
  pokemon: any;
};

const DetailButton: React.FC<DetailButtonProps> = ({ pokemon }) => {
  const history = useHistory();

  const handleDetailClick = () => {
    history.push({
      pathname: `/pokemon-detail/${pokemon.pokedex_id}`,
      state: { pokemon },
    });
  };

  return (
    <IonButton slot="end" onClick={handleDetailClick}>
      Voir le détail
    </IonButton>
  );
};

export default DetailButton;
