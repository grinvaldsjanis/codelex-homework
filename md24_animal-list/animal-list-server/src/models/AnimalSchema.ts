import { Schema, model, Document } from "mongoose";

type AClass = "mammal" | "bird" | "fish" | "reptile" | 'amphibian' | 'insect';

export interface AnimalInterface extends Document {
  name: string;
  aclass: AClass;
  createdAt: Date;
  updatedAt: Date;
}

const animalSchema = new Schema<AnimalInterface>({
    name: { type: String, required: true },
    aclass: { type: String, enum: ['mammal', 'bird', 'reptile', 'amphibian', 'fish', 'insect'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AnimalModel = model<AnimalInterface>("Animal", animalSchema, "animals");

export default AnimalModel;
