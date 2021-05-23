import { createAction, props } from '@ngrx/store';
import { Contact } from '../interfaces/';

export const LoadContacts = createAction("Contact Component] Load Contacts");
export const LoadedSuccess = createAction("Contact Component] Loaded Success", props<{ contacts: Array<Contact> }>());
export const LoadContact = createAction("Contact Component] Load Contact", props<{ id: number }>());
export const LoadedContactSuccess = createAction("Contact Component] Loaded Success", props<{ contact: Contact }>());
export const Failure = createAction("Contact Component] Loaded Failure", props<{ error: string }>());
export const Add = createAction('[Contact Component] Add', props<{ contact: Contact }>());
export const AddSuccess = createAction('[Contact Component] Add Success', props<{ contact: Contact }>());
export const UpdateSuccess = createAction('[Contact Component] Update Success', props<{ contact: Contact }>());
export const Update = createAction('[Contact Component] Update', props<{ contact: Contact }>());
export const RemoveSuccess = createAction('[Contact Component] Remove Success', props<{ id: number }>());
export const Remove = createAction('[Contact Component] Remove', props<{ id: number }>());