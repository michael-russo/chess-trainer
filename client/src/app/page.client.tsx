'use client';

import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { Chess } from 'chess.js';
import Chessboard from 'chessboardjsx';

import { handleMove } from './utils';
import { Openings } from '../components/data';
import TraningOptions from '../components/TrainingOptions';

export default function HomeClient() {
  const [isWindow, setIsWindow] = useState(false);
  useEffect(() => {
    if (window) {
      setIsWindow(true);
    }
  }, []);

  const [chess] = useState<Chess>(
    new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  );

  const [fen, setFen] = useState(chess.fen());
  const [trainingOpening, setTrainingOpening] = useState<Openings>();
  console.log(trainingOpening);
  return (
    <>
      {isWindow && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={5}
          display={'flex'}
        >
          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <h1>Hello, Welcome to the Chess Trainer</h1>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <div>Select one of the following training options</div>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <Grid item xs={12}>
              <TraningOptions setTrainingOpening={setTrainingOpening} />
            </Grid>
          </Grid>
          {trainingOpening && (
            <>
              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <div>You are now playing the trainer in the {trainingOpening}</div>
              </Grid>
              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <div className="flex-center">
                  <Chessboard
                    width={800}
                    position={fen}
                    onDrop={(move) =>
                      handleMove(
                        {
                          from: move.sourceSquare,
                          to: move.targetSquare,
                          promotion: 'q',
                        },
                        chess,
                        setFen
                      )
                    }
                  />
                </div>
              </Grid>
              <div>LOG</div>

              <div>This opening starts with white to e4</div>
            </>
          )}
        </Grid>
      )}
    </>
  );
}
