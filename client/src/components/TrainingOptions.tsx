'use client';

import { Dispatch, SetStateAction } from 'react';

import { Button, Grid } from '@mui/material';

import { chessOpenings, Openings, UserColor, VariationMoves } from './data';

export default function TraningOptions({
  setTrainingVariation,
  setSelectedOption,
  userColorState,
}: {
  setTrainingVariation: Dispatch<SetStateAction<VariationMoves[] | undefined>>;
  setSelectedOption: Dispatch<SetStateAction<Openings | undefined>>;
  userColorState: [UserColor | undefined, Dispatch<SetStateAction<UserColor | undefined>>];
}) {
  const options = Object.keys(chessOpenings) as Openings[];
  const [, setUserColor] = userColorState;
  return (
    <>
      <Grid item xs={12} justifyContent={'space-between'}>
        {options.map((option) => (
          <Button
            variant="contained"
            key={option}
            style={{ margin: 2 }}
            onClick={() => {
              setTrainingVariation(chessOpenings[option][1]);
              setSelectedOption(option);
              setUserColor('black');
            }}
          >
            {option}
          </Button>
        ))}
      </Grid>
    </>
  );
}
