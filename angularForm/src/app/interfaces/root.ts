import { Property } from './name';

export interface Root {
  type: string;
  name: string;
  label: string;
  properties: Property[];
}
