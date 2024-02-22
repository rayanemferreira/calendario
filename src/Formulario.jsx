import React from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDataContext } from './components/contexts/Context';

const { Option } = Select;

const Formulario = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setData } = useDataContext();



  //   {
  //     "title": "ffffff",
  //     "TextArea": "fffffffffffffffffff",
  //     "startDate": "2024-02-15T04:00:00.000Z",
  //     "endDate": "2024-02-23T04:00:00.000Z",
  //     "localizacao": "ffff",
  //     "participantes": "ffffffff",
  //     "type": "warning",
  //     "content": "ffffff",
  //     "id": "1907bd33-b187-421e-9d6f-a93865e8fc75"
  // }


  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        const endDate = values.endDate.format('YYYY-MM-DD');
        const novoDado = {
          ...values,
          type: 'success',
          content: values.title,
          id: uuidv4(),
        };

        setData(prevState => {
          return {
            ...prevState,
            [endDate]: [...(prevState[endDate] || []), novoDado],
          };
        });


        navigate('/layout', {
          state: {
            ...values,
            id: uuidv4(),
          },
        });
      })
      .catch(errorInfo => {
        console.log('Falha na validação:', errorInfo);
      });
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      labelCol={{
        xs: { span: 24 },
        sm: { span: 6 },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 14 },
      }}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Titulo"
        name="title"
        rules={[
          {
            required: true,
            message: 'Por favor, informe o título!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descrição"
        name="description"
        rules={[
          {
            required: true,
            message: 'Por favor, informe a descrição!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Por favor, selecione o status!',
          },
        ]}
      >
        <Select>
          <Option value="pendente">Pendente</Option>
          <Option value="em_andamento">Em andamento</Option>
          <Option value="concluida">Concluída</Option>
          <Option value="atrasada">Atrasada</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Prioridade"
        name="priority"
        rules={[
          {
            required: true,
            message: 'Por favor, selecione a prioridade!',
          },
        ]}
      >
        <Select>
          <Option value="baixa">Baixa</Option>
          <Option value="media">Média</Option>
          <Option value="alta">Alta</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Data de Fim"
        name="endDate"
        rules={[
          {
            required: true,
            message: 'Por favor, selecione a data de fim!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >

        <Button onClick={() => navigate("/layout")} type="primary">Voltar</Button>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default Formulario;
