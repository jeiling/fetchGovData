import React, { useEffect, useState } from "react";
import { fetchData } from "./dataActions.ts";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { years, YearMap, Years } from "./constant.ts";
import { RootState } from "./types";
import Select from "./Select.tsx";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('107');
  const [site, setSite] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const dispatch = useDispatch();
  const { data, error } = useSelector((state: RootState) => state);
  const infoKey = `year_${value}`;
  const navigate = useNavigate();

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

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = `?year=${value}&site=${site}&village=${village}`;
    navigate(`/results${query}`, { replace: true });
  };

  if (error) {
    return <div>Error: {error}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "absolute",
        left: "50%",
        top: "5%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "50%",
      }}
    >
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
      <Button type="submit" disabled={isLoading || error || !data?.[infoKey]}>
        submit
      </Button>
    </form>
  );
};

export default App;
