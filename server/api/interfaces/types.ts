export interface FullData {
  athlete_id: number;
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
  germanCountryName: string;
}

export interface SportResult extends TopAthletes {
  athlete: string;
}

export interface Medalist extends SportResult {
  sport: string;
}

export interface CountryMedalsMap {
  [country: string]: {
    medals: Medals,
    germanCountryName: string,
  }
}

export interface CountryMedal {
  countryCode: string;
  germanCountryName: string;
  medals: Medals;
}

export interface Medals {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface UpdateResult {
  id: number;
  result: number;
}