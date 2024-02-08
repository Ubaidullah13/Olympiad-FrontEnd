import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const CustomSocialsField = ({ type, label,handleChange, required }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const boldLabelStyle = {
  fontWeight: 'bold',
  color: '#000000',
  }

  const Options = [
    { value: 'qawali', label: 'Qawali' },
    { value: 'concert', label: 'Concert' },
    { value: 'all', label: 'All' },
    { value: 'nosocials', label: 'None' },
  ];

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={boldLabelStyle}>{label}</FormLabel>
      <RadioGroup
        aria-label="socials"
        name="socials"
        onChange={handleChange}
      >
        {Options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            // control={<Radio />}
            control={<Radio required={required} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomSocialsField;
// import React from 'react';
// import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

// const CustomRadioField = ({ label, handleChange }) => {
//   const boldLabelStyle = {
//     fontWeight: 'bold',
//     color: '#000000',
//   };

//   const Options = [
//     { value: 'nust', label: 'Nust' },
//     { value: 'other_uni', label: 'Other University' },
//     { value: 'college', label: 'College' },
//     { value: 'school', label: 'School' },
//     { value: 'other', label: 'Other' },
//   ];

//   return (
//     <FormControl component="fieldset">
//       <FormLabel component="legend" style={boldLabelStyle}>{label}</FormLabel>
//       <RadioGroup
//         aria-label="University"
//         name="uni"
//         value={handleChange} 
//         onChange={(e) => handleChange(e.target.value)} 
//         column
//       >
//         {Options.map((option) => (
//           <FormControlLabel
//             key={option.value}
//             value={option.value}
//             control={<Radio />}
//             label={option.label}
//           />
//         ))}
//       </RadioGroup>
//     </FormControl>
//   );
// };

// export default CustomRadioField;
