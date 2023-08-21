import { Dispatch, SetStateAction } from 'react';

import { Chess } from 'chess.js';

export const handleMove = (
  move: { from: string; to: string; promotion?: string | undefined },
  chess: Chess,
  setFen: Dispatch<SetStateAction<string>>
) => {
  const isValidMove =
    chess.moves({ verbose: true }).filter((m) => m.from === move.from && m.to === move.to).length >
    0;

  if (isValidMove) {
    chess.move(move);
    setTimeout(() => {
      const moves = chess.moves();

      if (moves.length > 0) {
        const computerMove = moves[Math.floor(Math.random() * moves.length)];
        chess.move(computerMove);
        setFen(chess.fen());
      }
    }, 300);

    setFen(chess.fen());
  }
};
