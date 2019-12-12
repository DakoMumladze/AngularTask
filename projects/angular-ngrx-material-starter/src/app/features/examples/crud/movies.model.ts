import { EntityState } from '@ngrx/entity';

export interface movie {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
}

export interface moviestate extends EntityState<movie> {}
