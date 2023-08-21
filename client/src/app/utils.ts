import { Dispatch, SetStateAction, use } from 'react';

import { Chess } from 'chess.js';

import { UserColor, VariationMoves } from '../components/data';

export const handleMove = (
  userColor: UserColor,
  move: { from: string; to: string; promotion?: string | undefined },
  chess: Chess,
  setFen: Dispatch<SetStateAction<string>>,
  variationMoves: VariationMoves[],
  turnCounter: [number, Dispatch<SetStateAction<number>>]
) => {
  if (
    (userColor === 'black' && chess.turn() === 'w') ||
    (userColor === 'white' && chess.turn() === 'b')
  ) {
    setTimeout(() => {
      const trainerMoves = getTrainersMoves(chess, variationMoves, turnCounter, userColor);
      if (trainerMoves) {
        chess.move(trainerMoves);
        setFen(chess.fen());
      }
    }, 300);

    setFen(chess.fen());
  } else {
    const isValidMove =
      chess.moves({ verbose: true }).filter((m) => m.from === move.from && m.to === move.to)
        .length > 0;

    if (isValidMove) {
      chess.move(move);
      setFen(chess.fen());

      setTimeout(() => {
        const trainerMoves = getTrainersMoves(
          chess,
          variationMoves,
          turnCounter,
          getTrainerColor(userColor)
        );
        if (trainerMoves) {
          chess.move(trainerMoves);
          setFen(chess.fen());
        }
      }, 300);
    }
  }
};

const getTrainersMoves = (
  chess: Chess,
  variationMoves: VariationMoves[],
  turnCounter: [number, Dispatch<SetStateAction<number>>],
  userColor: UserColor
) => {
  const [turnCount, setTurnCount] = turnCounter;
  const movesForTrainer = chess.moves({ verbose: true }).filter((m) => {
    return m.san === variationMoves[turnCount][userColor];
  });

  const isValidMove = movesForTrainer.length > 0;
  if (isValidMove) {
    const move = movesForTrainer[0];
    setTurnCount(turnCount + 1);
    return move;
  }
};

const getTrainerColor = (userColor: UserColor) => {
  if (userColor === 'black') {
    return 'white';
  } else {
    return 'black';
  }
};
