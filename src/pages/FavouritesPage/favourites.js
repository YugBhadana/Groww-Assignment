import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getFromLocalStorage, storeToLocalStorage } from "../../utils/datas";
import { FAVORITES } from "../../utils/const";
import { columns } from "../../utils";
import "../AllBanksPage/allBanksPage.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoritesBanks();
  }, []);

  const fetchFavoritesBanks = () => {
    const favoritesBanks = getFromLocalStorage(FAVORITES) ?? [];
    setFavorites(favoritesBanks);
  };

  const tableColumns = [
    ...columns,
    {
      title: "Remove from Favorites",
      render: (bank) => {
        const handleClick = (event) => {
          event.stopPropagation();

          return removeFromFavorites(bank.ifsc);
        };

        return (
          <div onClick={handleClick}>
            <i class="fas fa-trash-alt"></i>
          </div>
        );
      },
    },
  ];

  const removeFromFavorites = (ifsc) => {
    const newFavorites = favorites.filter((bank) => bank.ifsc !== ifsc);

    const params = {
      key: FAVORITES,
      value: newFavorites,
    };
    storeToLocalStorage(params);
    setFavorites(newFavorites);
  };

  return (
    <div className="wrapper">
      <div className="all-banks-header container">
        <h3 className="page-heading">Favorite Banks</h3>
      </div>

      <div className="table container">
        <Table
          columns={tableColumns}
          dataSource={favorites}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default Favorites;
