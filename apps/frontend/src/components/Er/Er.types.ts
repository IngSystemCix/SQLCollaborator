export interface EntityAttribute {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: string; // nombre de la entidad referenciada
  cardinality?: "1:1" | "1:N" | "N:1" | "N:M";
}

export interface Entity {
  name: string;
  attributes: EntityAttribute[];
}

export interface ERModel {
  entities: Entity[];
}