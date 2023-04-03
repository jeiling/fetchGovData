import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './types'; 
import { FetchDataAction, InfoOfYear } from './types'

export const fetchData = (apiName:string):ThunkAction<void, RootState, unknown, FetchDataAction> => async (dispatch) => {
  try {
    const res = await axios.get(apiName);
    if(res.statusText==='OK'){
      let year = ''
      const {result} = res.data
      const copyResult = JSON.parse(JSON.stringify(result.records))
      copyResult.shift()
      year = `year_${result.records[1].statistic_yyy}`
      const site_id = Array.isArray(copyResult)?[...new Set(copyResult.map(ele=>ele.site_id))]:null
      const village = Array.isArray(copyResult)?[...new Set( copyResult.map(ele=>ele.village))]:null
      const yearInfo: InfoOfYear = {
          site_id,
          village
        }
      dispatch({
        type: 'FETCH_DATA_SUCCESS',
        payload: { [year] : yearInfo},
      });
    }
   
  } catch (err) {
    dispatch({
      type: 'FETCH_DATA_FAILURE',
      payload: err.message
    });
  }
};
