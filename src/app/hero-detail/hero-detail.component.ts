import { Component, Input, input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent {
  HeroName = new FormGroup({
    heros: new FormControl(''),
    id: new FormControl<number | null>(null),
    power: new FormControl(''),
  });

  //get hero name in input
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => {
      this.HeroName.controls.id.setValue(hero.id);
      this.HeroName.controls.heros.setValue(hero.name);
      this.HeroName.controls.power.setValue(hero.power);
    });
  }

  //subscribe to input

  //update name

  @Input() hero?: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  //return to previous page
  goBack(): void {
    this.location.back();
  }

  save(): void {
    const v = this.HeroName.value;
    console.log(v);
    if (!v.heros) {
      return;
    }
    if (!v.id) {
      return;
    }
    if (!v.power) {
      return;
    }

    const hero: Hero = { name: v.heros, id: v.id, power: v.power };
    this.heroService.updateHero(hero).subscribe(() => this.goBack());
  }
}
