import { useEffect, useState } from "react";
import Map from "../map";
import SearchBar from "../map/search";
import axios from "axios";
import { Button } from "@/styles/Button.style";
import { BiFullscreen } from "react-icons/bi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { removeCookie } from "@/utils/utils";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";

const defaultLocation = {
  annotations: {
    DMS: {
      lat: "31° 33' 56.45592'' N",
      lng: "74° 18' 51.05844'' E",
    },
    MGRS: "43RDQ3491692500",
    Maidenhead: "MM71dn75qs",
    Mercator: {
      x: 8272616.999,
      y: 3684068.846,
    },
    OSM: {
      edit_url:
        "https://www.openstreetmap.org/edit?node=1886594378#map=16/31.56568/74.31418",
      note_url:
        "https://www.openstreetmap.org/note/new#map=16/31.56568/74.31418&layers=N",
      url:
        "https://www.openstreetmap.org/?mlat=31.56568&mlon=74.31418#map=16/31.56568/74.31418",
    },
    UN_M49: {
      regions: {
        ASIA: "142",
        PK: "586",
        SOUTHERN_ASIA: "034",
        WORLD: "001",
      },
      statistical_groupings: ["LEDC"],
    },
    callingcode: 92,
    currency: {
      alternate_symbols: ["Rs"],
      decimal_mark: ".",
      disambiguate_symbol: "PKR",
      html_entity: "&#x20A8;",
      iso_code: "PKR",
      iso_numeric: "586",
      name: "Pakistani Rupee",
      smallest_denomination: 100,
      subunit: "Paisa",
      subunit_to_unit: 100,
      symbol: "₨",
      symbol_first: 1,
      thousands_separator: ",",
    },
    flag: "🇵🇰",
    geohash: "ttsge43gmvxhc1pgkyw1",
    qibla: 260.26,
    roadinfo: {
      drive_on: "left",
      speed_in: "km/h",
    },
    sun: {
      rise: {
        apparent: 1686009540,
        astronomical: 1686003660,
        civil: 1686007860,
        nautical: 1686005880,
      },
      set: {
        apparent: 1685973840,
        astronomical: 1685979660,
        civil: 1685975460,
        nautical: 1685977500,
      },
    },
    timezone: {
      name: "Asia/Karachi",
      now_in_dst: 0,
      offset_sec: 18000,
      offset_string: "+0500",
      short_name: "PKT",
    },
    what3words: {
      words: "mailings.recitals.plugs",
    },
    wikidata: "Q11739",
  },
  bounds: {
    northeast: {
      lat: 31.7256822,
      lng: 74.4741829,
    },
    southwest: {
      lat: 31.4056822,
      lng: 74.1541829,
    },
  },
  components: {
    "ISO_3166-1_alpha-2": "PK",
    "ISO_3166-1_alpha-3": "PAK",
    "ISO_3166-2": ["PK-PB"],
    _category: "place",
    _type: "neighbourhood",
    city: "Lahore",
    continent: "Asia",
    country: "Pakistan",
    country_code: "pk",
    postcode: "54010",
    state: "Punjab",
    state_code: "PB",
    subdistrict: "Lahore Cantonment Tehsil",
  },
  confidence: 3,
  formatted: "Lahore Cantonment Tehsil, Lahore 54010, Pakistan",
  geometry: {
    lat: 31.5656822,
    lng: 74.3141829,
  },
};

const AddLocation = ({
  createAddressHandler,
  showMap,
}: {
  createAddressHandler: any;
  showMap: boolean;
}) => {
  const APIKEY = "1a12e15218234ec6838a401380c55b08";
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [incrementforcount, setIncrementforcount] = useState(0);
  const [addressgetmap, setAddressgetmap] = useState<any>();
  const [selectedLocation, setSelectedLocation] = useState<any>(
    defaultLocation
  );
  const [AddressName, setAddressName] = useState<any>("");
  const [FlatNumber, setFlatNumber] = useState<any>("");
  const [StreetAddress, setStreetAddress] = useState<any>("");
  const [City, setCity] = useState<any>("");
  const [PostalCode, setPostalCode] = useState<any>("");
  const [Notes, setNotes] = useState<any>("");
  const [Lat, setLat] = useState<any>("");
  const [Log, setLog] = useState<any>("");
  const [Loading, setLoading] = useState<any>(false);
  const { profile } = useSelector((state: any) => state);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };


  // This function will be called after 1 second to enable the button
  const enableButtonAfterDelay = () => {
    setButtonEnabled(false);
    // setTimeout(enableButton, 1000); // 1000 milliseconds = 1 second
    setTimeout(() => {
      setButtonEnabled(true);
    }, 500);
  };

  console.log("isButtonEnabled", isButtonEnabled)



  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncrementforcount(0)

    const value = e.target.value;
    setSearchTerm(value);
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          e.target.value
        )}&key=${APIKEY}`
      );
      setSearchResults(response.data.results);
      console.log("addresssss", response.data.results)

    } catch (error) {
      console.error("Searched error: ", error);
    }
  };

  const handleResultClick = (result: any) => {
    createAndSaveAddress();
    setIncrementforcount(incrementforcount + 1)
    setSelectedLocation(result);
    setSearchTerm(result.formatted);
    console.log("entered", result.formatted)
    setSearchResults([]);
    console.log("result1", result)
    console.log("result12", result.formatted)
    localStorage.setItem("addressMain", JSON.stringify(result));
    localStorage.setItem("addressJson", JSON.stringify(result));
    // router.push("/userProfile/addressshow/addresscreate")
  };

  const selectedLocationHandlers = async (location: any) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          location.lat
        )}+${encodeURIComponent(location.lng)}&key=${APIKEY}`
      );
      setSearchTerm(response.data.results[0].formatted);
      setSelectedLocation(response.data.results[0]);
      localStorage.setItem("addressMain", JSON.stringify(response.data.results[0]));
      localStorage.setItem("addressJson", JSON.stringify(response.data.results[0]));
      // router.push("/userProfile/addressshow/addresscreate")

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const createAndSaveAddress = () => {
    createAddressHandler(selectedLocation);
    setIncrementforcount(incrementforcount + 1)
  };

  const createAndSaveAddressfinalpush = () => {
    setIncrementforcount(incrementforcount - 2)
    createAddressHandler(selectedLocation);

  };

  useEffect(() => {
    if (searchTerm === "") {
      console.log("")
    }
    else {
      // localStorage.setItem("addressMain", JSON.stringify(searchTerm));
      // localStorage.setItem("addressJson", JSON.stringify(searchTerm));
      // router.push("/userProfile/addressshow/addresscreate")
    }
  }, [searchTerm])

  useEffect(() => {
    const addressget: any = localStorage.getItem("addressMain");
    const addressparsed = JSON.parse(addressget);
    setAddressgetmap(JSON.parse(addressget));
    setAddressName(addressparsed?.formatted);
    setLat(`${addressparsed?.geometry?.lat}`)
    setLog(`${addressparsed?.geometry?.lng}`)
    // console.log("increment", addressparsed?.geometry, addressparsed?.geometry)
  }, [searchTerm, selectedLocation])




  // console.log("increment", addressgetmap)

  const postData = async () => {
    setLoading(true)
    const apiUrl = 'https://gateway.findanexpert.net/address_svc/pv/UserAddress/addAddress';

    const requestData = {
      userId: profile?.externalCustomerId,
      line1: addressgetmap?.formatted,
      line2: FlatNumber,
      townCity: City,
      postalCode: PostalCode,
      state: StreetAddress,
      countryId: 1,
      latitude: Lat,
      longitude: Log,
      addressName: addressgetmap?.formatted,
      addressNote: Notes,
      isResidentialAddress: true,
      radius: 20,
      addressTypeValue: 1,
      createdBy: 10,
      isDefault: isChecked
    };

    try {
      const response = await axios.post(apiUrl, requestData);
      {
        localStorage.getItem("addressflag") ?
          router.push("/flowManagementPages/expert_address") :
          router.push("/userProfile/addressshow/addressshow")
      }
      localStorage.removeItem("addressflag");
      localStorage.removeItem("addressMain");
      localStorage.removeItem("addressJson");
      setLoading(false)
      //    window.location.reload();
    } catch (error: any) {
      // setResponseData(null);
      if (error?.response?.status === 401) {
        enqueueSnackbar('Your session has been expired, You have been logged out!', { variant: 'warning' });
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        removeCookie && removeCookie("profile");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtRefreshToken");
        localStorage.clear();
        router.push("/");
        // window.location.reload();
      }
      console.log('An error occurred');
      setLoading(false)
    }
  };

  const postData1 = () => {
    enqueueSnackbar('Please fill all fields correctly!', { variant: 'error' });
  }

  return (
    <main>
      <div id="map" className="position-relative mt-4">
        <SearchBar
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
          searchResults={searchResults}
          handleResultClick={handleResultClick}
        />
        <div className="col-md-12 mt-4">
          <Map
            isFullScreen={showMap}
            center={[
              selectedLocation.geometry?.lat || defaultLocation.geometry.lat,
              selectedLocation.geometry?.lng || defaultLocation.geometry.lng,
            ]}
            defaultGeometry={{
              lat: 33.6938882232111,
              lng: 73.0651304125786,
            }}
            zoom={17}
            selectedLocationHandler={selectedLocationHandlers}
          />
        </div>
      </div>
      {/* {addressgetmap != null ? */}

      <div className="col-md-12 background_address_line mt-3 px-2">
        <div className="col-md-12">
          <p className="label_line mb-0 pb-0 ps-1 pt-2">Address Name</p>
          <input
            type="text"
            className="border border-0 input_profile_all_address w-100"
            value={addressgetmap?.formatted}
            // onChange={(e) =>
            //   setAddressName(e.target.value)
            // }
            placeholder="Address name"
          />
        </div>
        <hr className="my-1 p-0 background_line" />
        <div className="col-md-12">
          <p className="label_line mb-0 pb-0 ps-1 pt-2">Flat & Building Number</p>
          <input
            type="text"
            className="border border-0 input_profile_all_address w-100"
            value={FlatNumber}
            onChange={(e) =>
              setFlatNumber(e.target.value)
            }
            placeholder="Flat & Building Number"
          />
        </div>
        <hr className="my-1 p-0 background_line" />
        <div className="col-md-12">
          <p className="label_line mb-0 pb-0 ps-1 pt-2">Street Address</p>
          <input
            type="text"
            className="border border-0 input_profile_all_address w-100"
            value={StreetAddress}
            onChange={(e) =>
              setStreetAddress(e.target.value)
            }
            placeholder="Street Address"
          />
        </div>
        <hr className="my-1 p-0 background_line" />
        <div className="col-md-12">
          <p className="label_line mb-0 pb-0 ps-1 pt-2">City</p>
          <input
            type="text"
            className="border border-0 input_profile_all_address w-100"
            value={City}
            onChange={(e) =>
              setCity(e.target.value)
            }
            placeholder="City"
          />
        </div>
        <hr className="my-1 p-0 background_line" />
        <div className="col-md-12 mb-1">
          <p className="label_line mb-0 pb-0 ps-1 pt-2">Postal Code</p>
          <input
            type="text"
            className="border border-0 input_profile_all_address w-100"
            value={PostalCode}
            onChange={(e) =>
              setPostalCode(e.target.value)
            }
            placeholder="Postal Code"
          />
        </div>
      </div>
      <div className="col-md-12 background_address_line mt-2 px-2">
        <div className="col-md-12">
          <p className="label_line mb-0 pb-0 ps-1 pt-2">Address Note</p>
          <input
            type="text"
            className="border border-0 input_profile_all_address w-100"
            value={Notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Address Note"
          />
        </div>
      </div>
      <div className="form-check px-4">
        <input
          className="form-check-input mt-2"
          type="checkbox"
          id="defaultCheck1"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label default_label_address" htmlFor="defaultCheck1">
          Set as my default address
        </label>
      </div>

      <div className="col-md-12 text-center ">
        <button
          className={`btn ${FlatNumber.length === 0 || StreetAddress.length === 0 || City.length === 0 || PostalCode.length === 0 ? "btn-secondary px-5 mt-3" : "btn-danger universal_button_color mt-3 px-5"}`}
          onClick={FlatNumber.length === 0 || StreetAddress.length === 0 || City.length === 0 || PostalCode.length === 0 ? postData1 : postData}
        // disabled={FlatNumber.length === 0 || StreetAddress.length === 0 || City.length === 0 || PostalCode.length === 0}
        >
          Save & Continue {Loading === true ?
            <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> : null
          }
        </button>
      </div>
    </main>
  );
};
export default AddLocation;
