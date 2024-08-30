import React from 'react';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

type NavigationButtonProps = {
  path: string;  // Chemin de redirection
  text: string;  // Texte à afficher sur le bouton
};

const NavigationButton: React.FC<NavigationButtonProps> = ({ path, text }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(path);
  };

  return (
    <IonButton onClick={handleClick}>
      {text}
    </IonButton>
  );
};

export default NavigationButton;
