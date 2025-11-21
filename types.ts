export interface TripSuggestion {
  location: string;
  description: string;
  activities: string[];
}

export enum AnimationState {
  Initial = 'INITIAL',
  Animating = 'ANIMATING',
  Finished = 'FINISHED'
}
