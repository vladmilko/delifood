import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CuisineOption } from './Cuisine';
import { PickUpTimes } from './PickUpTimes';
import { 
  getAllCuisinesThunk,
  getFilteredBoxesThunk } from '../../../store/boxes/actions';

export const FilterNav = () => {
  const dispatch = useDispatch();
  const cuisines = useSelector((store) => (store.boxes?.cuisines));

  useEffect(() => {
    dispatch(getAllCuisinesThunk(42));
  }, []);

  const onChangeHandler = (event) => {
    event.preventDefault();
    const option = event.target.name;
    const value = event.target.value;
    
    dispatch(getFilteredBoxesThunk({option, value}));
  }

  return (
    <div className="w-screen  shadow p-5 rounded-lg bg-white">
      <form>
      <div className="relative">
        <input 
        type="text" 
        name="searchBar"
        placeholder="Search by restaurant name or location"  className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"/>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="font-medium">
        Filter the boxes
        </p>

        <div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md mr-2">
          All boxes
          </button>

          <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-medium rounded-md">
          Reset Filter
          </button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          <select 
          onChange={onChangeHandler}
          name="cuisine"
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            {cuisines.map((el) => {
              return (
                <CuisineOption 
                cuisine={el.name} />
              )
            })}
          </select>

          <select 
          onChange={onChangeHandler}
          name="price"
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            <option value="anyPrice">Any Price</option>
            <option value="lowPrice">Low to High</option>
            <option value="highPrice">Hight to Low</option>
          </select>

          <select 
          onChange={onChangeHandler}
          name="time"
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            <PickUpTimes />
          </select>
        </div>
      </div>
      </form>
    </div>
  )
}
