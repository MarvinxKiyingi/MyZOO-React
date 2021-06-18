import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Animal } from '../models/Animal';

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
      let getDataFromLS: Animal[] = JSON.parse(sessionStorage.getItem('Animals') || '[]');
      setAnimals(getDataFromLS);
    }
  }, []);

  let animalContent = animals.map((animal) => {
    return (
      <div key={animal.id} className='animalContent'>
        <h4>{animal.name}</h4>
        <img src={animal.imageUrl} alt={animal.id.toString()} />
        <p>{animal.shortDescription}</p>
        <div>
          <Link to={'/animal/' + animal.id}>Visa mer</Link>
        </div>
      </div>
    );
  });
  return <div className='animalWrapper'>{animalContent}</div>;
}
