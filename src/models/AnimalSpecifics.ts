export class AnimalSpecifics {
  constructor(
    public id: number,
    public name: string,
    public latinName: string,
    public yearOfBirth: number,
    public longDescription: string,
    public imageUrl: string,
    public medicine: string,
    public isFed: boolean,
    public lastFed: Date
  ) {}
}
