import { FullData, Medalist, SportResult, TopThreeAthletes } from "../interfaces/types";
import { knex } from "./database.service";

export default class ResultService {
  async topThreeAthletes(sport: string): Promise<TopThreeAthletes> {
    try {
      const topMaleAthletes = await this.topThreeAthletesQuery(sport, "male");
      const topFemaleAthletes = await this.topThreeAthletesQuery(sport, "female");

      const newTopAthletes: TopThreeAthletes = {
        men: topMaleAthletes.map((data: FullData) => {
          return {
            result: data.result,
            country: data.country
          };
        }),
        women: topFemaleAthletes.map((data: FullData) => {
          return {
            result: data.result,
            country: data.country
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
      console.log(sport);
      console.log(gender);
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
          country: data.country,
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
      console.log(medalists);
      const newMedalists: Medalist[] = medalists.map((data: FullData) => {
        return {
          result: data.result,
          country: data.country,
          athlete: data.athlete,
          sport: data.sport
        }
      });
      return newMedalists;
    } catch (err) {
      throw new Error(err);
    }
  }

  // async countryMedals(): Promise<FullData> {
  //   try {
  //     const countryMedals = await knex<FullData>('allData')
  //   } catch (err) {
  //   throw new Error(err);
  //   }
  // }
  /* 
  [
{
countryName: "",
medals: {gold: 0, silver: 0, bronze: 0, total: 0
}
]
 */

  async countries(): Promise<string[]> {
    try {
      const countries = await knex<string[]>('country').select('name');
      return countries.map(country => country.name);
    } catch (err) {
      throw new Error(err);
    }
  }
}