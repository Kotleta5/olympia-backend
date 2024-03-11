import { CountryMedal, CountryMedalsMap, FullData, Medalist, Medals, SportResult, TopThreeAthletes } from "../interfaces/types";
import { knex } from "./database.service";

export default class ResultService {
  regionNames = new Intl.DisplayNames(
    [new Intl.Locale('de')], { type: 'region' }
  );

  async fullData(): Promise<FullData[]> {
    try {
      const fullData = await knex<FullData>('alldata_list');
      const newFullResults: FullData[] = fullData.map(fullData => {
        return {
          ...fullData,
          country: this.getGermanCountryName(fullData.country),
        };
      });
      return newFullResults;
    } catch (err) {
      throw new Error(err);
    }
  }

  async topThreeAthletes(sport: string): Promise<TopThreeAthletes> {
    try {
      const topMaleAthletes = await this.topThreeAthletesQuery(sport, "male");
      const topFemaleAthletes = await this.topThreeAthletesQuery(sport, "female");

      const newTopAthletes: TopThreeAthletes = {
        men: topMaleAthletes.map((data: FullData) => {
          return {
            result: data.result,
            country: data.country.toUpperCase(),
            germanCountryName: this.getGermanCountryName(data.country),
          };
        }),
        women: topFemaleAthletes.map((data: FullData) => {
          return {
            result: data.result,
            country: data.country.toUpperCase(),
            germanCountryName: this.getGermanCountryName(data.country),
          };
        }),
      };
      return newTopAthletes;
    } catch (err) {
      throw new Error(err);
    }
  }

  async topThreeAthletesQuery(sport: string, gender: string): Promise<FullData[]> {
    return await knex<FullData>('alldata_list')
      .select()
      .where('sport', sport)
      .where('gender', gender)
      .orderBy('result')
      .limit(3);
  }

  async fullResults(sport: string, gender: string): Promise<SportResult[]> {
    try {
      const fullResults = await knex<FullData>('alldata_list')
        .select()
        .where({
          sport: sport,
          gender: gender
        })
        .orderBy('result');
      const newFullResults: SportResult[] = fullResults.map((data: FullData) => {
        return {
          result: data.result,
          country: data.country.toUpperCase(),
          germanCountryName: this.getGermanCountryName(data.country),
          athlete: data.athlete
        };
      });
      return newFullResults;
    } catch (err) {
      throw new Error(err);
    }
  }

  async medalists(): Promise<Medalist[]> {
    try {
      const medalists = await knex<FullData>('alldata_list').select();
      const newMedalists: Medalist[] = medalists.map((data: FullData) => {
        return {
          result: data.result,
          country: data.country.toUpperCase(),
          germanCountryName: this.getGermanCountryName(data.country),
          athlete: data.athlete,
          sport: data.sport
        }
      });
      return newMedalists;
    } catch (err) {
      throw new Error(err);
    }
  }

  async countryMedals(): Promise<CountryMedal[]> {
    try {
      const fullData: FullData[] = await knex<FullData>('alldata_list').select().orderBy('country');

      let countryMedalMap: CountryMedalsMap = {};
      fullData.forEach((fullData: FullData) => {
        countryMedalMap[fullData.country] = {
          germanCountryName: this.getGermanCountryName(fullData.country),
          medals: this.createCountryMedals(fullData, countryMedalMap[fullData.country]?.medals)
        };
      });

      return this.mapCountryMedalMapToCountryMedalList(countryMedalMap);
    } catch (err) {
      throw new Error(err);
    }
  }

  private mapCountryMedalMapToCountryMedalList(countryMedalsMap: CountryMedalsMap): CountryMedal[] {
    return Object.entries(countryMedalsMap).map(countryMedal => {
      return { countryCode: countryMedal[0].toUpperCase(), ...countryMedal[1] };
    }).sort((a, b) => a.germanCountryName > b.germanCountryName ? 1 : -1);
  }

  private createCountryMedals(fullData: FullData, medals: Medals): Medals {

    if (!medals) {
      medals = { gold: 0, silver: 0, bronze: 0, total: 0 };
    }
    return {
      gold: fullData.result === 1 ? medals.gold + 1 : medals.gold,
      silver: fullData.result === 2 ? medals.silver + 1 : medals.silver,
      bronze: fullData.result === 3 ? medals.bronze + 1 : medals.bronze,
      total: fullData.result <= 3 ? medals.total + 1 : medals.total,
    }
  }

  private getGermanCountryName(countryCode: string): string {
    return this.regionNames.of(countryCode.toUpperCase()) ?? 'UNKNOWN'
  }

  async countries(): Promise<string[]> {
    try {
      const countries = await knex<string[]>('country').select('name');
      return countries.map(country => this.getGermanCountryName(country.name));
    } catch (err) {
      throw new Error(err);
    }
  }
}