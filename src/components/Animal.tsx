import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AnimalSpecifics } from '../models/AnimalSpecifics';

interface IAnimalParams {
  id: string;
}
export function AnimalDetails() {
  let { id } = useParams<IAnimalParams>();
  let stateDefaultValue: AnimalSpecifics = {
    id: 0,
    name: '',
    latinName: '',
    yearOfBirth: 0,
    longDescription: '',
    imageUrl: '',
    medicine: '',
    isFed: false,
    lastFed: new Date(),
  };
  const [animal, setAnimal] = useState(stateDefaultValue);
  useEffect(() => {
    // hämtar listan från localStorage
    let getDataFromLS: AnimalSpecifics[] = JSON.parse(localStorage.getItem('Animals') || '[]');
    //Ändrar id värde från string till number
    let parsedParamsID: number = parseInt(id);
    // Går igenom min lista från localStorage för att hitta ett object med samma id som finns i min URL för just det djuret
    let animalOB = getDataFromLS.find((animalObject) => animalObject.id === parsedParamsID);
    if (animalOB) {
      setAnimal(animalOB);
    } else {
      console.log('localStorage is empty');
    }
  }, [id]);
  return (
    <div>
      <h4>{animal.latinName}</h4>
      <img src={animal.imageUrl} alt={animal.name} />
    </div>
  );
}
