import { createReducer, on, Action } from '@ngrx/store';
import { Contact } from '../interfaces';
import { Add, AddSuccess, Failure, LoadedSuccess, Remove, RemoveSuccess, UpdateSuccess } from './actions';

export interface PhoneBookState {
  contacts: Array<Contact>;
  loading: boolean,
  error: any
}

export const initialState: PhoneBookState = {
  contacts: [],
  loading: false,
  error: null
};

export const _phoneBookReducer = createReducer(
  initialState,
  on(LoadedSuccess, (state, {contacts}) => ({
    ...state,
    contacts: contacts,
    error: null
  })),
  on(AddSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
    error: null
  })),
  on(RemoveSuccess, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter(contact => contact.id !== id),
    error: null
  })),
  on(UpdateSuccess, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map(contactInList => (contactInList.id === contact.id ? { ...contact } : contactInList)),
    error: null
  })),
  on(Failure, (state, { error }) => ({
    ...state,
    error: error
  }))
);

export function phoneBookReducer(state: PhoneBookState | undefined, action: Action) {
  return _phoneBookReducer(state, action);
}

export const featureKey = 'phoneBooksSliceState';