import React from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDataContext } from './contexts/Context';


const Evento = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data, setData } = useDataContext();


  const location = useLocation();

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        const startDate = values.startDate.format('YYYY-MM-DD');
        const endDate = values.endDate.format('YYYY-MM-DD');

        const currentDate = new Date(startDate);
        const endDateObject = new Date(endDate);

        const id = location.state?.id; // Obtém o ID do estado de localização, se existir

        const novoDado = {
          ...values,
          type: 'warning',
          content: values.title,
          id: id || uuidv4(), // Se não houver um ID, gera um novo UUID
        };

        const newData = { ...data };

        while (currentDate <= endDateObject) {
          const currentDateStr = currentDate.toISOString().split('T')[0];
          if (id) {
            // Se estiver editando, encontra e atualiza o item com o ID correspondente
            newData[currentDateStr] = (newData[currentDateStr] || []).map(item => {
              if (item.id === id) {
                return novoDado;
              }
              return item;
            });
          } else {
            // Se estiver criando, adiciona o novo item ao array
            newData[currentDateStr] = [...(newData[currentDateStr] || []), novoDado];
          }

          currentDate.setDate(currentDate.getDate() + 1); // Incrementa a data
        }

        setData(newData);
        navigate('/layout');
      })
      .catch(errorInfo => {
        console.log('Falha na validação:', errorInfo);
      });
  };

  console.log('location?.state', location?.state)
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
        initialValue={location?.state?.title}

        rules={[
          {
            required: true,
            message: 'Por Favor, informe o campo!',
          },
        ]}
      >

        <Input
          defaultChecked
        />
      </Form.Item>


      <Form.Item
        label="Descrição"
        name="TextArea"
        initialValue={location?.state?.TextArea}

        rules={[
          {
            required: true,
            message: 'Por Favor, informe o campo!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Data inicial"
        name="startDate"
        initialValue={location?.state?.startDate}

        rules={[
          {
            required: true,
            message: 'Por Favor, informe o campo!',
          },
        ]}
      >
        <DatePicker
        />
      </Form.Item>

      <Form.Item
        label="Data final"
        name="endDate"
        initialValue={location?.state?.endDate}

        rules={[
          {
            required: true,
            message: 'Por Favor, informe o campo!',
          },
        ]}
      >
        <DatePicker

        />
      </Form.Item>

      <Form.Item
        label="localizacao"
        name="localizacao"
        initialValue={location?.state?.localizacao}

        rules={[
          {
            required: true,
            message: 'Por Favor, informe o campo!',
          },
        ]}
      >
        <Input

        />
      </Form.Item>

      <Form.Item
        label="participantes"
        name="participantes"
        initialValue={location?.state?.participantes}

        rules={[
          {
            required: true,
            message: 'Por Favor, informe o campo!',
          },
        ]}
      >
        <Input

        />
      </Form.Item>



      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}


      >

        <Button
          onClick={() => navigate("/layout")}
          type="primary">Criar Sala de Videoconferencia</Button>
        <br></br>


        <Button onClick={() => navigate("/layout")} type="primary">Voltar</Button>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default Evento;

