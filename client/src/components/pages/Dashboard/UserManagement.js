import React from 'react'

const UserManagement = () => {
    const [vehicles, setVehicle] = useState([]);
    const [search, setSearch] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const { loadVehicles } = useContext(AuthContext);
    useEffect(() => {
      const loadVehicle = async () => {
        const response = await loadVehicles();

        setVehicle(response.data);
      };
      loadVehicle();
    }, []);

  return (
    <div>UserManagement</div>
  )
}

export default UserManagement