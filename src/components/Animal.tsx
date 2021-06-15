import { useParams } from 'react-router';
import { Animal } from '../models/Animal';

interface IAnimalParams {
  id: string;
}
export function AnimalDetails() {
  let { id } = useParams<IAnimalParams>();
  return <div> Animal component works: {id}</div>;
}
