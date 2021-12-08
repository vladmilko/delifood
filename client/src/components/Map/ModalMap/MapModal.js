import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { GeolocationControl, Map, Placemark, SearchControl, YMaps } from "react-yandex-maps";
import { setUserLocation } from "../../../store/user/clientLocation/actions";
import { ActionButton } from "../../Buttons/ActionButton";

export const MapModal = ({ modalState, SetModalState }) => {
  const user = useSelector((store) => store.auth.user);
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  
  return (
    <Transition.Root show={modalState} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={SetModalState}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-8 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Change your location:
                    </Dialog.Title>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-8 flex flex-col">
              
              <YMaps 
                query={{apikey: 'a9e98eaf-d4c4-45e6-9ee4-5afad392d357'}}
              >
                <Map 
                  state={{ center: [user?.location?.lat, user?.location?.lon], zoom: 9 }} 
                  width={'100%'} height={'600px'} 
                  options={{autoFitToViewport: 'always'}} 
                  modules={["geolocation", "geocode"]}
                >
                  <Placemark geometry={[user?.location?.lat, user?.location?.lon]}/>
                  <GeolocationControl options={{ float: 'left', noPlacemark: true }} onLocationChange={async (e) => {
                    const [lat, lon] =  e.originalEvent.position;
                    let req = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=51d9c7fc-7e81-4f44-a747-14323b05f7a6&geocode=${lon}, ${lat}`)
                    let res = await req.json();
                    const address = res.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;

                    dispatch(setUserLocation({address, lat, lon}))
                  }}/>
                  <SearchControl 
                    options={{ float: 'right' }} 
                    onResultSelect={async (e) => {
                      const res = await e.originalEvent.target.getResult(0);
                      const [lat, lon] = res.geometry.getCoordinates();
                      // console.log(res.getAdministrativeAreas());
                      // console.log(res.getLocalities());
                      
                      dispatch(setUserLocation({
                        address: res.getAddressLine(),
                        lat,
                        lon,
                      }))
                    }
                  }/>
                </Map>
              </YMaps>
              </div>
              <ActionButton content={'OK'} func={() => SetModalState(false)}/>   
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}