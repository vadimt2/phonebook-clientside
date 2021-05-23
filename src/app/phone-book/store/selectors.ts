import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PhoneBookState, featureKey } from './reducer';

export interface AppState {
  phoneBooksSliceState: PhoneBookState;
}

export const selectPhoneBooksSliceState =
  createFeatureSelector<AppState, PhoneBookState>(featureKey);

export const selectPhoneBooks = createSelector(
    selectPhoneBooksSliceState,
  (state: PhoneBookState) => state.contacts
);

export const selectError = createSelector(
  selectPhoneBooksSliceState,
(state: PhoneBookState) => state.error
);


export const selectPhoneBookById = (id: number) => createSelector(selectPhoneBooks, (contacts) => {
    return contacts.find((contactInList) => contactInList.id === id)
});