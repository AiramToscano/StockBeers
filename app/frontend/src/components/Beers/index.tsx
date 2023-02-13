import React, {
    useEffect, useCallback, useState,
  } from 'react';
  import { apiBeersQuerys, apiDeleteBeers } from '../../utils/Apis';
  import { IBeers } from '../../interfaces/IBeers';
  import Button from '../Button';
  import usePaginations from '../../hooks/usePagination';
import Buttons from '../Buttons';
import FormEdit from '../FormEdit';
  
  function Beers() {
    const [beers, setBeers] = useState<IBeers[]>([]);
    const [beersUpdate, setBeersUpdate] = useState<IBeers>();
    const [editbeers, setEditBeers] = useState(false);
    const { setActualPage, actualPage } = usePaginations();

    const ApiRandom = useCallback(async (page: number) => {
      const apiRandom = await apiBeersQuerys(page);
      setBeers(apiRandom);
    }, []);
  
    async function handleSubmitDelete(id: string) {      
      await apiDeleteBeers(id)
      window.location.reload();
    }
  
    async function handleSubmitUpdate(obj: IBeers) {
      setBeersUpdate(obj)
      setEditBeers(true)
    }
  
    useEffect(() => {
      ApiRandom(actualPage)
    }, []);
  
    return (
      <div>
        {editbeers && <FormEdit  abv ={Number(beersUpdate?.abv)}
        address = {String(beersUpdate?.address)}
        _id = {String(beersUpdate?._id)}
        category = {String(beersUpdate?.category)}
        city = {String(beersUpdate?.city)}
        coordinates ={[Number(beersUpdate?.coordinates)]}
        country = {String(beersUpdate?.country)}
        description = {String(beersUpdate?.description)}
        ibu = {Number(beersUpdate?.ibu)}
        state = {String(beersUpdate?.state)}
        setEditBeers = {setEditBeers}
        name = {String(beersUpdate?.name)}
        website = {String(beersUpdate?.website)} />}
        {beers.length >= 1  && !editbeers && beers.map((e, _index) => (
          <div key={ e._id }>
            <p>Nome da cerveja : {e.name}</p>
            <p>Grau ABV: {e.abv}</p>
            <p>Endereço: {e.address}</p>
            <p>Categoria: {e.category}</p>
            <p>Cidade: {e.city}</p>
            <p>Coodernadas: {e.coordinates}</p>
            <p>País: {e.country}</p>
            <p>Descrição: {e.description}</p>
            <p>taxa IBU: {e.ibu}</p>
            <p>Estado: {e.state}</p>
            <p>Site: {e.website}</p>
            <div className="btn">
              <Button
                name="Deletar"
                onClick={ () => handleSubmitDelete(e._id) }
              />
            </div>
            <div className="btn">
              <Button
                name="Editar"
                onClick={ () => handleSubmitUpdate(e) }
              />
            </div>
          </div>
        ))}
        {!editbeers &&  <Buttons  setActualPage= {setActualPage} actualPage={actualPage}/> }
      </div>
    );
  }
  
  export default Beers;
  