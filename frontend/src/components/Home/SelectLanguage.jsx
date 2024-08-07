import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Menu } from "antd";
import { useUser } from "../UserContext";

const SelectLanguage = () => {
  const { selectedLanguage, setSelectedLanguage, setSelectFile } = useUser();

  const items = [
    {
      label: "Python",
      key: "1",
    },
    {
      label: "Java",
      key: "2",
    },
  ];

  const placeholderItem = {
    label: "Language",
    key: "0",
  };

  const [selectedItem, setSelectedItem] = useState(() => {
    if (selectedLanguage) {
      const selected = items.find((item) => item.label === selectedLanguage);
      return selected || placeholderItem;
    }
    return placeholderItem;
  });

  const onClick = ({ key }) => {
    const selectedItem = items.find((item) => item.key === key) || placeholderItem;
    setSelectedItem(selectedItem);
    setSelectedLanguage(selectedItem.label);
    setSelectFile(null);
    console.log("Selected Language", selectedItem.label);
    message.info(`${selectedItem.label} selected`);
    localStorage.setItem("selectedLanguage", selectedItem.label);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    const storedItem = storedLanguage ? items.find((item) => item.label === storedLanguage) || placeholderItem : placeholderItem;
    setSelectedLanguage(storedLanguage || "");
    setSelectedItem(storedItem);
  }, []);

  return (
    <div className="language">
      <Dropdown
        overlay={
          <Menu onClick={onClick} style={{ backgroundColor: "#ffff", border: "1px solid #d9d9d9", width: "130px", marginLeft: "-20px", padding: "10px 20px 10px 10px", marginTop: "10px" }}>
            {items.map((item) => (
              <Menu.Item key={item.key} style={{ fontSize: "15px" }} disabled={item.label === selectedLanguage}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {selectedItem.label}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default SelectLanguage;