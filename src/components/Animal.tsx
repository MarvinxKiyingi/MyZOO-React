import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AnimalSpecifics } from '../models/AnimalSpecifics';

interface IAnimalParams {
  id: string;
}
export function AnimalDetails() {
  let { id } = useParams<IAnimalParams>();
  let animalStateDefaultValue: AnimalSpecifics = {
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
  const [animal, setAnimal] = useState(animalStateDefaultValue);

  // hämtar listan från localStorage
  let animalsStateDefaultValue: AnimalSpecifics[] = JSON.parse(localStorage.getItem('Animals') || '[]');
  const [animals, setAnimals] = useState(animalsStateDefaultValue);

  //Ändrar id värde från string till number
  const parsedParamsID: number = parseInt(id);

  useEffect(() => {
    // Går igenom min lista från localStorage för att hitta ett object med samma id som finns i min URL för just det djuret
    let animalObj = animals.find((animalObject) => animalObject.id === parsedParamsID);
    if (animalObj) {
      setAnimal(animalObj);
    } else {
      console.log('localStorage is empty');
    }
  }, [id, parsedParamsID, animals]);

  function feedAnimal() {
    const updatedAnimal = [...animals];
    for (let i = 0; i < updatedAnimal.length; i++) {
      if (updatedAnimal[i].id === parsedParamsID) {
        updatedAnimal[i].isFed = true;
        updatedAnimal[i].lastFed = new Date();

        localStorage.setItem('Animals', JSON.stringify(updatedAnimal));
        setAnimal(updatedAnimal[i]);
        setAnimals(updatedAnimal);
      }
    }
  }

  return (
    <div>
      <div></div>
      <h4>{animal.latinName}</h4>
      <img src={animal.imageUrl} alt={animal.name} />
      <button onClick={feedAnimal}>Mata mig!</button>
      <p>Djur är mattat: {animal.isFed ? 'Ja' : 'Nej'}</p>
      <p>{animal.isFed.toString()}</p>
    </div>
  );
}
