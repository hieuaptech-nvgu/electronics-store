import React, { useEffect, useState } from 'react';
import { List } from "lucide-react";
import "./Header.css";
import { useLocation } from "react-router-dom";

const CategorySidebar = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        if(isHome){
            setShowSidebar(true);
        }
    }, [isHome])

    const handleShowSidebar = () => {
        if(isHome) return;
      setShowSidebar((prev) => !prev);
    }

    return (
      <div className="categories-sidebar">
        <div className="categories-title" onClick={handleShowSidebar}>
          <List size={18} />
          <span>Danh mục sản phẩm</span>
        </div>

        {showSidebar && (
          <ul className="list-categories list-unstyled mb-0">
            <li className="categories-item">PC Gaming - Máy tính chơi game</li>
            <li className="categories-item">PC Workstation</li>
            <li className="categories-item">Tự build cấu hình PC</li>
            <li className="categories-item">PC Văn phòng</li>
            <li className="categories-item">PC AMD Gaming</li>
            <li className="categories-item">PC Core Ultra</li>
            <li className="categories-item">PC Gaming Đẹp - Cao cấp</li>
            <li className="categories-item">PC Giả lập - Ảo hóa</li>
            <li className="categories-item">PC Mini</li>
            <li className="categories-item">PC Refurbished</li>
            <li className="categories-item-more">+ Xem thêm</li>
          </ul>
        )}
      </div>
    );
};

export default CategorySidebar;