import React from 'react';

const ButtonContact = ({ link, name }) => {
  const openLink = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
        <button onClick={openLink} style={{ background: `no-repeat center center`, backgroundSize: 'cover' }}>
            <span>{name}</span>
        </button>
  );
};

export default ButtonContact;
