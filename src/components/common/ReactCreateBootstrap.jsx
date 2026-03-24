// Styling taken from https://www.npmjs.com/package/react-select-bootstrap?activeTab=code

import { mergeStyles } from 'react-select';
import Creatable from 'react-select/creatable';

const ReactCreateBootstrap = ({ isInvalid = false, ...props }) => {
  return (
    <Creatable
      {...props}
      styles={mergeStyles(
        {
          control: (styles) => ({
            ...styles,
            borderRadius: 'var(--bs-border-radius)',
            ...(!isInvalid
              ? {
                  borderColor: '#ced4da',
                  '&:hover': {
                    border: '1px solid #ced4da',
                  },
                  '&:focus-within': {
                    boxShadow: '0 0 0 0.25rem rgba(13, 110, 253, 0.25)',
                    borderColor: '#86b7fe',
                  },
                }
              : {
                  borderColor: 'var(--bs-red)',
                  '&:hover': {
                    border: '1px solid var(--bs-red)',
                  },
                  '&:focus-within': {
                    boxShadow: '0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25)',
                    borderColor: 'var(--bs-red)',
                  },
                }),
          }),
          indicatorsContainer: (styles) => ({
            ...styles,
            '& > div': {
              color: '#343a40',
            },
            '& > div:hover': {
              color: '#343a40',
            },
          }),
        },
        props.styles,
      )}
    />
  );
};

export default ReactCreateBootstrap;
