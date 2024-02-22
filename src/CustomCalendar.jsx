import React, { useState } from 'react';
import { Badge, Calendar } from 'antd';

import dayjs from 'dayjs';
import Alert from 'antd/es/alert/Alert';
import CustomModal from './components/CustomModal/CustomModal';


const CustomCalendar = ({ data, setData }) => {


  const getListData = (value) => {
    return data[value.format("YYYY-MM-DD")] || [];
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  const [value, setValue] = useState(() => dayjs('2024-02-21'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2024-02-21'));
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const [isOpen, setIsOpen] = useState(false);

  const onCancel = ''
  const onConfirm = ''
  const isLoading = false


  const onChange = (newValue) => {
    setSelectedValue(newValue);

    if (getListData(newValue).length > 0) {
      setIsOpen(true);
    }
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  return <>
    <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />

    <CustomModal
      setData={setData}
      data={data}
      selectedValue={selectedValue.format("YYYY-MM-DD")}
      isOpen={isOpen}
      onCancel={() => { setIsOpen(false) }}

      onConfirm={() => { setIsOpen(false) }}
      isLoading={isLoading}
    />
    <Calendar onChange={onChange} value={value} onSelect={onSelect} onPanelChange={onPanelChange} cellRender={cellRender} />;
  </>

};


export default CustomCalendar
