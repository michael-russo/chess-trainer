'use client';

import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { Chess } from 'chess.js';
import Chessboard from 'chessboardjsx';

import { handleMove } from './utils';
import { Openings, UserColor, VariationMoves } from '../components/data';
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
  const [trainingVariation, setTrainingVariation] = useState<VariationMoves[]>();
  const [selectedOption, setSelectedOption] = useState<Openings>();
  const userColorState = useState<UserColor>();

  const turnCounter = useState(0);

  useEffect(() => {
    setTimeout(() => {}, 500);
    if (turnCounter[0] === 0 && userColorState[0] === 'black' && selectedOption && isWindow) {
      const firstMove = chess.moves({ verbose: true }).filter((move) => {
        return move.from === 'e2' && move.to === 'e4';
      });
      chess.move(firstMove[0]);
      setFen(chess.fen());
      turnCounter[1](1);
    }
  }, [chess, isWindow, selectedOption, turnCounter, userColorState]);

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
          padding={1}
        >
          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <h1>Hello, Welcome to the Chess Trainer</h1>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <div>Select one of the following training options</div>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <Grid item xs={12}>
              <TraningOptions
                setTrainingVariation={setTrainingVariation}
                setSelectedOption={setSelectedOption}
                userColorState={userColorState}
              />
            </Grid>
          </Grid>

          {selectedOption && (
            <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              You are now playing the trainer in the {selectedOption}
            </Grid>
          )}
          {selectedOption && trainingVariation && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={3}
              display={'flex'}
            >
              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <div className="flex-center">
                  <Chessboard
                    width={window.innerWidth * 0.7}
                    orientation="black"
                    position={fen}
                    onDrop={(move) =>
                      handleMove(
                        'black',
                        {
                          from: move.sourceSquare,
                          to: move.targetSquare,
                          promotion: 'q',
                        },
                        chess,
                        setFen,
                        trainingVariation,
                        turnCounter
                      )
                    }
                  />
                </div>
              </Grid>
              <div>LOG</div>

              <div>This opening starts with white to e4</div>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
