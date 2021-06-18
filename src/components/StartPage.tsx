import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Animal } from '../models/Animal';
import './../styles/_StartPage.scss';

// this another way of writing functionalcomponents.
export function StartPage() {
  let stateDefaultValue: Animal[] = [];
  const [animals, setAnimals] = useState(stateDefaultValue);

  useEffect(() => {
    //Motsvarande NgOnInit i Angular, med syfte att köras på en gång när vår component körsa
    if (!sessionStorage.getItem('Animals')) {
      axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals').then((Response) => {
        setAnimals(Response.data);
        sessionStorage.setItem('Animals', JSON.stringify(Response.data));
      });
    } else {
      let getDataFromSs: Animal[] = JSON.parse(sessionStorage.getItem('Animals') || '[]');
      setAnimals(getDataFromSs);
    }
  }, []);

  let animalContent = animals.map((animal) => {
    return (
      <div key={animal.id} className='animal-content'>
        <div className='poster-container'>
          <img src={animal.imageUrl} alt={animal.id.toString()} className='poster' />
        </div>
        <div className='text-Container'>
          <h4>{animal.name}</h4>
          <div className='showMoreBtn-Container'>
            <Link to={'/animal/' + animal.id} className='showMore-Btn'>
              Visa mer
            </Link>
          </div>
        </div>
      </div>
    );
  });
  return <div className='animal-container'>{animalContent}</div>;
}
