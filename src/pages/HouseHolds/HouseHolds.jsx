import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../utils/ApiHandlers";
import ListHouseTable from "../../components/HouseHolds/ListHouseTable";

const HouseHolds = () => {
  const fetchHouses = async () => {
    try {
      const res = await fetchData(`/list/houses`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHouses();
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <Link
          to={"/houses/add"}
          className="py-2 px-3 bg-deep-navy hover:bg-deep-navy/80 text-14 text-white"
        >
          Add House
        </Link>
      </div>

      <div>
        <ListHouseTable />
      </div>
    </div>
  );
};

export default HouseHolds;
