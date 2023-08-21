'use client';

import { Dispatch, SetStateAction } from 'react';

import { Button, Grid } from '@mui/material';

import { chessOpenings, Openings } from './data';

export default function TraningOptions({
  setTrainingOpening,
}: {
  setTrainingOpening: Dispatch<SetStateAction<Openings | undefined>>;
}) {
  const options = Object.keys(chessOpenings) as Openings[];

  return (
    <>
      <Grid item xs={12} justifyContent={'space-between'}>
        {options.map((option) => (
          <Button
            variant="contained"
            key={option}
            style={{ margin: 2 }}
            onClick={() => setTrainingOpening(option)}
          >
            {option}
          </Button>
        ))}
      </Grid>
    </>
  );
}
