import React ,{ useEffect, useState }from 'react';
import { fetchData } from './dataActions.ts'
import { useDispatch, useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { years } from './constant.ts'
import { RootState } from './types'; 

const App:React.FC = () =>{
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('107');
  const dispatch = useDispatch()
  const { data, error } = useSelector((state: RootState ) => state)

useEffect(()=>{
  setIsLoading(!data)
},[data])


  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchData('/api1'))
  }, []);
  
    const handleChange = (event) => {
      const {value} = event.target
      setIsLoading(true)
      setValue(value)
      dispatch(fetchData('/api2'))
    };

  if (error) {
    return <div>Error: {error}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <InputLabel>選擇項目</InputLabel>
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {years.map((y:string)=>(
            <MenuItem value={y}>{y}</MenuItem>  
          ))}
        </Select>
        {data?.year_107?.site_id?.map((ele:string)=>(<li>{ele}</li>))}
    </>
  );
}

export default App;
