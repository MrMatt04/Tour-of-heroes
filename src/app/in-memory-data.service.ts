import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice', power: 'they are pretty nice' },
      { id: 13, name: 'Bombasto', power: 'blows up' },
      { id: 14, name: 'Celeritas', power: '404 joke not found' },
      { id: 15, name: 'Magneta', power: 'is attracted to you 😳' },
      { id: 16, name: 'RubberMan', power: 'Mr. fantatic bootleg' },
      { id: 17, name: 'Dynama', power: 'is dynamic' },
      { id: 18, name: 'Dr. IQ', power: 'watches rick and morty' },
      { id: 19, name: 'Magma', power: 'is hot' },
      { id: 20, name: 'Tornado', power: 'spins around really fast' },
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
