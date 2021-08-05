export interface Property {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  inputType?: string;
  options?: Option[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  integer?: boolean;
  minimum?: number;
  maximum?: number;
  item?: Item[];
  multiline?: boolean;
  properties?: Property3[];
}

export interface Option {
  value: string;
  label: string;
}

export interface Item {
  type: string;
  name: string;
  properties: Property2[];
}

export interface Property2 {
  name: string;
  type: string;
  label: string;
  required: boolean;
  integer?: boolean;
}

export interface Property3 {
  type: string;
  name: string;
  label: string;
  required: boolean;
}
