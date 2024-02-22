import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CustomCalendar from './CustomCalendar.jsx';
const { Header, Content, Sider } = Layout;
import { Button, Flex } from 'antd';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDataContext } from './components/contexts/Context.jsx';
// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
const items2 = [
  { icon: UserOutlined, name: "Usuario", options: ['Configuraçoes'] },
  { icon: NotificationOutlined, name: "Alarme", options: ['Criar alarme'] },
  { icon: LaptopOutlined, name: "Arquivo na Nuvem", options: ['carregar arquivo'] },
].map((item, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(item.icon),
    label: item.name,
    children: item.options.map((option, j) => {

      return {
        // key: subKey,
        label: option,
      };
    }),
  };
});
const Lay = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, setData } = useDataContext();




  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          // items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>Lay</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 60,
              height: '200%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <CustomCalendar data={data} setData={setData}></CustomCalendar>
            <div >

              <Button
                onClick={() => navigate("/task")}
                type="primary">Tarefa </Button>

              <Button
                onClick={() => navigate("/event")}
                type="primary">Evento </Button>

              <Button type="primary">Bloco de Notas</Button>
            </div>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Lay;