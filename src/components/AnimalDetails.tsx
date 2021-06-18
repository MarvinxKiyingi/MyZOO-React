import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AnimalSpecifics } from '../models/AnimalSpecifics';
import { Link } from 'react-router-dom';
import './../styles/_AnimalDetails.scss';

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

  // hämtar listan från sessionStorage
  let animalsStateDefaultValue: AnimalSpecifics[] = JSON.parse(sessionStorage.getItem('Animals') || '[]');
  const [animals, setAnimals] = useState(animalsStateDefaultValue);

  //Ändrar id värde från string till number
  const parsedParamsID: number = parseInt(id);

  useEffect(() => {
    // Går igenom min lista från sessionStorage för att hitta ett object med samma id som finns i min URL för just det djuret
    let animalObj = animals.find((animalObject) => animalObject.id === parsedParamsID);
    if (animalObj) {
      setAnimal(animalObj);
    } else {
      axios.get<AnimalSpecifics[]>('https://animals.azurewebsites.net/api/animals').then((Response) => {
        setAnimals(Response.data);
        sessionStorage.setItem('Animals', JSON.stringify(Response.data));
      });
    }
  }, [id, parsedParamsID, animals]);

  function feedAnimal() {
    const updatedAnimal = [...animals];
    for (let i = 0; i < updatedAnimal.length; i++) {
      if (updatedAnimal[i].id === parsedParamsID) {
        updatedAnimal[i].isFed = true;
        updatedAnimal[i].lastFed = new Date();

        setAnimal(updatedAnimal[i]);
        setAnimals(updatedAnimal);
        sessionStorage.setItem('Animals', JSON.stringify(updatedAnimal));
      }
    }
  }

  return (
    <div className='animalDetails-Container'>
      <div className='poster-Container'>
        <img src={animal.imageUrl} alt={animal.name} className='poster' />
      </div>

      <div className='text-Container'>
        <h4>
          {animal.latinName} ( {animal.latinName} )
        </h4>
        <h5>Födelse år: {animal.yearOfBirth}</h5>
        <p>{animal.longDescription}</p>
        <div className='feedMeBtn-container'>
          <button onClick={feedAnimal} disabled={animal.isFed}>
            {animal.isFed ? 'Jag är belåten' : 'Mata mig!'}
          </button>
        </div>
        <div className='backHomeBtn-Container'>
          <Link to={'/'} className='backHome-Btn'>
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
