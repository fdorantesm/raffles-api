import { Sex } from 'src/modules/challenges/domain/enums/sex.enum';
import { Modality } from './../../../challenges/domain/enums/modality.enum';
export class ProfileEntity {
  constructor(
    public name: string,
    public phone: string,
    public age: number,
    public weight: number,
    public height: number,
    public city: string,
    public instagram: string,
    public facebook: string,
    public supplements: string,
    public ailments: string,
    public origin: string,
    public exercise: string,
    public food: string,
    public modality: Modality,
    public sex: Sex,
  ) {}

  static create(profile: UserProfile) {
    return new ProfileEntity(
      profile.name,
      profile.phone,
      profile.age,
      profile.weight,
      profile.height,
      profile.city,
      profile.instagram,
      profile.facebook,
      profile.supplements,
      profile.ailments,
      profile.origin,
      profile.exercise,
      profile.food,
      <Modality>profile.modality,
      <Sex>profile.sex,
    );
  }
}

export type UserProfile = {
  name: string;
  phone: string;
  age: number;
  weight: number;
  height: number;
  city: string;
  instagram: string;
  facebook: string;
  supplements: string;
  ailments: string;
  origin: string;
  exercise: string;
  food: string;
  modality: string;
  sex: string;
};
