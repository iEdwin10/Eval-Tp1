import React from 'react';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

type DetailButtonProps = {
  pokemon: {
    name: {
      en: string;
    };
  };
};

const DetailButton: React.FC<DetailButtonProps> = ({ pokemon }) => {
  const history = useHistory();

  const handleDetailClick = () => {
    history.push({
      pathname: `/pokemon/${pokemon.name.en}`,
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
