import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Divider, Text, Button } from 'react-native-paper';

const logoLocal = require('./assets/house.png');

export default function App() {
  const [cep, setCep] = useState('');
  const [dadosCep, setDadosCep] = useState(null);
  const [erro, setErro] = useState('');

  const buscaCep = async (value) => {
    setErro('');
    setDadosCep(null);
    const cepLimpo = value.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      setErro('O CEP deve conter 8 dígitos numéricos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro('CEP não encontrado.');
        setDadosCep(null);
      } else {
        setDadosCep(data);
      }
    } catch (error) {
      setErro('Erro ao buscar CEP. Tente novamente.');
    }
  };

  const limparCampos = () => {
    setDadosCep(null);
    setCep('');
    setErro('');
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' }}>
      {/* Cabeçalho com ícone da casa e título */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
        <Image
          source={logoLocal}
          style={{ width: 40, height: 40, marginRight: 12, resizeMode: 'contain' }}
        />
        <Text
          variant="headlineMedium"
          style={{ color: 'purple', fontWeight: 'bold', textAlign: 'center', maxWidth: '80%' }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          Buscador de Endereços
        </Text>
      </View>

      <TextInput
        label="Digite o CEP"
        placeholder="12345678"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
        mode="outlined"
        style={{ marginBottom: 12, height: 40 }}
      />
      <Button
        mode="contained"
        onPress={() => buscaCep(cep)}
        buttonColor="purple"
        style={{ marginBottom: 12 }}
      >
        Buscar CEP
      </Button>
      {erro ? <Text style={{ color: 'red', marginBottom: 12 }}>{erro}</Text> : null}

      {dadosCep && (
        <View style={{ marginTop: 20, backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <TextInput
            label="Rua"
            value={dadosCep.logradouro || ''}
            editable={false}
            mode="outlined"
            style={{ marginBottom: 10, height: 40 }}
          />
          <Divider style={{ backgroundColor: 'gray', marginVertical: 4 }} />
          <TextInput
            label="Bairro"
            value={dadosCep.bairro || ''}
            editable={false}
            mode="outlined"
            style={{ marginBottom: 10, height: 40 }}
          />
          <Divider style={{ backgroundColor: 'gray', marginVertical: 4 }} />
          <TextInput
            label="Cidade"
            value={dadosCep.localidade || ''}
            editable={false}
            mode="outlined"
            style={{ marginBottom: 10, height: 40 }}
          />
          <Divider style={{ backgroundColor: 'gray', marginVertical: 4 }} />
          <TextInput
            label="Estado"
            value={dadosCep.uf || ''}
            editable={false}
            mode="outlined"
            style={{ marginBottom: 10, height: 40 }}
          />
          <Divider style={{ backgroundColor: 'gray', marginVertical: 4 }} />
          <Button
            mode="contained"
            onPress={limparCampos}
            buttonColor="red"
            style={{ marginTop: 12 }}
          >
            Limpar
          </Button>
        </View>
      )}
    </View>
  );
}
