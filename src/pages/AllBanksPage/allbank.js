import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./allBanksPage.css";
import "antd/dist/antd.min.css";
import { getAllBanks } from "../../utils/fetchapi";
import { columns } from "../../utils";
import Dropdown from "../../components/dropdown/dropdown";
import { TABLE_HEADERS, CITY_NAMES, FILTER_KEY } from "./data";
import { useDebounce } from "../../utils/Debounce";
import { getFromLocalStorage, storeToLocalStorage } from "../../utils/datas";
import { FAVORITES } from "../../utils/const";
import { Table } from "antd";

function AllBanksPage() {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [banks, setBanks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searched, setSearched] = useState("");
  const [filter, setFilter] = useState(TABLE_HEADERS[0]);
  const [city, setCity] = useState("MUMBAI");
  const debouncedTerm = useDebounce(searched, 500);

  const history = useHistory();

  const filteredBanks = useMemo(() => {
    const filterKey = FILTER_KEY[filter];

    return banks.filter((bank) => {
      const lowerCaseValue = bank[filterKey].toString().toLowerCase();

      return lowerCaseValue.includes(debouncedTerm.toLowerCase());
    });
  }, [filter, banks, debouncedTerm]);

  const tableColumns = [
    ...columns,
    {
      title: "Add to Favorites",
      render: (bank) => {
        const isFavorite = favorites
          .map((bank) => bank.ifsc)
          .includes(bank.ifsc);
        const handleClick = (event) => {
          event.stopPropagation();

          return isFavorite
            ? removeFromFavorites(bank.ifsc)
            : addToFavourites(bank);
        };

        return (
          <div onClick={handleClick}>
            <i
              className="fas fa-heart"
              style={{ color: isFavorite ? "red" : "" }}
            ></i>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchAllBanks(city);
    fetchFavoritesBanks();
  }, [city]);

  const fetchFavoritesBanks = () => {
    const favoritesBanks = getFromLocalStorage(FAVORITES) ?? [];
    setFavorites(favoritesBanks);
  };

  const fetchAllBanks = async (cityName) => {
    try {
      const banks = await getAllBanks(cityName);
      setLoading(false);
      setCity(cityName);
      setBanks(banks);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      console.error(error);
    }
  };

  const onCityChange = (cityName) => {
    fetchAllBanks(cityName);
  };

  const onFilterChange = (filterName) => {
    setFilter(filterName);
    setSearched("");
  };

  const onInputChange = ({ target }) => {
    setSearched(target.value);
  };

  const onRowClick = (bank) => {
    const { ifsc } = bank || {};

    return {
      onClick: () => history.push(`/bank-details/${ifsc}`, { bank }),
    };
  };

  const addToFavourites = (bank) => {
    const newFavorites = [...favorites, bank];
    const params = {
      key: FAVORITES,
      value: newFavorites,
    };

    storeToLocalStorage(params);
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (ifsc) => {
    const newFavorites = favorites.filter((bank) => bank.ifsc !== ifsc);

    const params = {
      key: FAVORITES,
      value: newFavorites,
    };
    storeToLocalStorage(params);
    setFavorites(newFavorites);
  };

  if (loading) {
    return <div className="loading">loading...</div>;
  }

  if (hasError) {
    return <div>Error...</div>;
  }

  return (
    <div className="wrapper">
      <div className="all-banks-header container">
        <h3 className="page-heading">All Banks in {city}</h3>
        <div className="all-banks-header-right-child">
          <input
            type="text"
            value={searched}
            onChange={onInputChange}
            placeholder="Filter Search"
          />
          <Dropdown arr={TABLE_HEADERS} onSelectChange={onFilterChange} />
          <Dropdown arr={CITY_NAMES} onSelectChange={onCityChange} />
        </div>
      </div>

      <div className="table container">
        <Table
          className="data-table"
          columns={tableColumns}
          dataSource={filteredBanks}
          pagination
          onRow={onRowClick}
        />
      </div>
    </div>
  );
}

export default AllBanksPage;
