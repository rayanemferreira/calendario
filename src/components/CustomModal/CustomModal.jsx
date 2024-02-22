import React, { useEffect, useMemo, useState } from 'react';
import { Divider, Modal, Popconfirm, Table } from 'antd';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';

const CustomModal = ({
  data,
  selectedValue,
  isOpen,
  onCancel,
  onConfirm,
  isLoading,
  setData
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const navigate = useNavigate();

  const handleDeleteRow = (id) => {
    setData((prevState) => {
      const newData = {};

      for (let date in prevState) {
        // Filtra os itens da data atual que têm o ID diferente do ID que estamos excluindo
        const updatedData = prevState[date].filter(item => item.id !== id);

        // Atualiza o novo estado apenas se houver alterações na data atual
        if (updatedData.length !== prevState[date].length) {
          newData[date] = updatedData;
        } else {
          newData[date] = prevState[date]; // Mantém os dados inalterados se nenhum item for excluído
        }
      }

      return newData;
    });
  };

  const handleEditRow = (record) => {
    // console.log('handleEditRow', record)

    let path = '/task'
    if (record.type === "warning") {
      path = '/event'
    }
    navigate(path, {
      state: {
        ...record
      },
    });

  };
  const columns = useMemo(() => {
    return [
      {
        title: 'content',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: 'ações',
        dataIndex: 'action',
        key: 'action',
        width: '16%',
        render: (_, record, index) => (
          <>
            <Popconfirm
              title={'deletar'}
              onConfirm={() => handleDeleteRow(record.id)}
            >
              <Link style={{ marginLeft: 8 }}>
                {'deletar'}
              </Link>
            </Popconfirm>

            <Popconfirm
              title={'editar'}
              onConfirm={() => handleEditRow(record)}
            >
              <Link style={{ marginLeft: 8 }}>
                {'editar'}
              </Link>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    setDataSource(data[selectedValue] || []);
  }, [setDataSource, data, selectedValue]);

  const disableSend = dataSource.length === 0 || isLoading;
  return (
    <Modal
      title={'fff'}
      onOk={() => onConfirm(dataSource, deleted)}
      onCancel={onCancel}
      open={isOpen}
      centered
      destroyOnClose
      confirmLoading={isLoading}
      width="40rem"
      closable={true}
      focusTriggerAfterClose={false}
      maskClosable={false}
      okText={'Fechar'}
      okButtonProps={{
        size: 'large',
        disabled: disableSend,
      }}
      afterClose={() => {
        setDataSource([]);
        setDeleted([]);
      }}
      cancelButtonProps={{ size: 'large', disabled: isLoading }}
    >
      <Divider
        style={{
          margin: 0,
        }}
      />
      <div
        style={{
          padding: '1.5rem',
        }}
      >
        <div>
          nejeoe
        </div>
        <div>
          <Table
            loading={isLoading}
            style={{ marginBottom: '1.5rem' }}
            columns={columns}
            pagination={false}
            dataSource={dataSource}
          />
        </div>
      </div>
      <Divider
        style={{
          margin: 0,
        }}
      />
    </Modal>
  );
};

export default CustomModal;
