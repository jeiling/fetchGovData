import React, { useEffect, useState } from "react";
import { fetchData } from "./dataActions.ts";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import { years, YearMap } from "./constant.ts";
import { RootState } from "./types";
import Select from "./Select.tsx";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("107");
  const [site, setSite] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const dispatch = useDispatch();
  const { data, error } = useSelector((state: RootState) => state);
  const infoKey = `year_${value}`;

  useEffect(() => {
    setIsLoading(!data);
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchData("/api1"));
  }, [dispatch]);

  useEffect(() => {
    if (data?.[infoKey]) {
      setIsLoading(false);
    }
  }, [data, infoKey]);

  const handleChangeYear = (option: string) => {
    setIsLoading(true);
    setValue(option);
    const newYearValue = YearMap[option];
    if (data?.infoKey) {
      return;
    }
    dispatch(fetchData(newYearValue));
  };

  if (error) {
    return <div>Error: {error}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Select
        label="Year"
        value={value}
        onChange={handleChangeYear}
        options={years}
      />
      {data?.[infoKey]?.site_id && (
        <Select
          label="site"
          value={site}
          onChange={setSite}
          options={data?.[infoKey]?.site_id}
        />
      )}
      {data?.[infoKey]?.village && (
        <Select
          label="village"
          value={village}
          onChange={setVillage}
          options={data?.[infoKey]?.village}
        />
      )}
    </Box>
  );
};

export default App;
