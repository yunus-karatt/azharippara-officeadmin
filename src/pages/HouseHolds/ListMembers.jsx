import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../../utils/ApiHandlers";
import Loading from "../../components/Loading/Loading";
import ListMembersTable from "../../components/HouseHolds/ListMembersTable";

const ListMembers = () => {
  const { houseId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const membersData = await fetchData(`/list/member/${houseId}`);
      console.log({ membersData });
      setMembers(membersData.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex justify-end">
        <Link
          to={`/member/add/${houseId}`}
          className="py-2 px-3 bg-deep-navy hover:bg-deep-navy/80 text-14 text-white"
        >
          Add Member
        </Link>
      </div>
      <div className="mt-6">
        <ListMembersTable members={members} />
      </div>
    </div>
  );
};

export default ListMembers;
