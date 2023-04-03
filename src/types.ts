export interface InitialState {
    data: null | DataPayload
    error: null
}

export interface InfoOfYear {
  site_id: string[]|null;
  village: string[]|null;
}

export interface DataPayload {
    [key: string]: InfoOfYear
  }

export   interface FetchDataSuccessAction {
    type: 'FETCH_DATA_SUCCESS';
    payload: DataPayload;
  }
  
export  interface FetchDataFailureAction {
    type: 'FETCH_DATA_FAILURE';
    payload: string;
  }
  
export type FetchDataAction = FetchDataSuccessAction | FetchDataFailureAction;


export interface RootState extends InitialState {
  
};
