import { validate, IsString } from 'class-validator';

export interface FullData {
  gender: string;
  athlete: string;
  sport: string;
  country: string;
  result: number;
}

export interface TopThreeAthletes {
  men: TopAthletes[],
  women: TopAthletes[]
}

export interface TopAthletes {
  result: number;
  country: string;
}

export interface SportResult extends TopAthletes {
  athlete: string;
}

export interface Medalist extends SportResult {
  sport: string;
}

export interface CountryMedals {
  country: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  }
}

export interface User {
  username: string;
  password: string;
  role: string;
}