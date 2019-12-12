import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { State } from '../../examples.state';
import { movie } from '../movies.model';
import { actionmoviesDeleteOne, actionmoviesUpsertOne } from '../movies.actions';
import { selectSelectedmovie, selectAllmovies } from '../moviess.selectors';

@Component({
  selector: 'anms-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  movieFormGroup = this.fb.group(CrudComponent.createmovie());
  movies$: Observable<movie[]> = this.store.pipe(select(selectAllmovies));
  selectedmovie$: Observable<movie> = this.store.pipe(select(selectSelectedmovie));

  isEditing: boolean;

  static createmovie(): movie {
    return {
      id: uuid(),
      title: '',
      imageUrl: '',
      videoUrl: '',
      description: ''
    };
  }

  constructor(
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router
  ) {}

  select(movie: movie) {
    this.isEditing = false;
    this.router.navigate(['examples/crud', movie.id]);
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  edit(movie: movie) {
    this.isEditing = true;
    this.movieFormGroup.setValue(movie);
  }

  addNew(movieForm: NgForm) {
    movieForm.resetForm();
    this.movieFormGroup.reset();
    this.movieFormGroup.setValue(CrudComponent.createmovie());
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete(movie: movie) {
    this.store.dispatch(actionmoviesDeleteOne({ id: movie.id }));
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  save() {
    if (this.movieFormGroup.valid) {
      const movie = this.movieFormGroup.value;
      this.store.dispatch(actionmoviesUpsertOne({ movie }));
      this.isEditing = false;
      this.router.navigate(['examples/crud', movie.id]);
    }
  }
}
