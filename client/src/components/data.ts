export interface ChessTurn {
  white: string;
  black: string;
}

export interface IVariations {
  [key: number]: ChessTurn[];
}

export type Openings = 'Sicilian Defense' | 'Pirc Defence';

export type ChessOpenings = {
  [key in Openings]: IVariations;
};

export const chessOpenings: ChessOpenings = {
  'Sicilian Defense': {
    1: [
      { white: 'e4', black: 'c5' },
      { white: 'b4', black: 'cxb4' },
      { white: 'a3', black: 'd5' },
      { white: 'exd5', black: 'Qxd5' },
      { white: 'axb4', black: 'Qe5' },
    ],
  },

  'Pirc Defence': {
    1: [
      { white: 'e4', black: 'd6' },
      { white: 'Bc4', black: 'Nd7' },
      { white: 'Nf3', black: 'g6' },
      { white: 'Ng5', black: 'Nh6' },
      { white: 'Bxf7+', black: 'Nxf7' },
    ],
  },
};
