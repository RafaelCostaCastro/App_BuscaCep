import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
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
    <View style={styles.container}>
      {/* Cabeçalho com logo e título */}
      <View style={styles.header}>
        <Image source={logoLocal} style={styles.logo} />
        <Text
          variant="headlineMedium"
          style={styles.title}
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
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={() => buscaCep(cep)}
        style={styles.button}
      >
        Buscar CEP
      </Button>
      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      {dadosCep && (
        <View style={styles.resultContainer}>
          <TextInput
            label="Rua"
            value={dadosCep.logradouro || ''}
            editable={false}
            style={styles.resultInput}
            mode="outlined"
          />
          <Divider style={styles.divider} />
          <TextInput
            label="Bairro"
            value={dadosCep.bairro || ''}
            editable={false}
            style={styles.resultInput}
            mode="outlined"
          />
          <Divider style={styles.divider} />
          <TextInput
            label="Cidade"
            value={dadosCep.localidade || ''}
            editable={false}
            style={styles.resultInput}
            mode="outlined"
          />
          <Divider style={styles.divider} />
          <TextInput
            label="Estado"
            value={dadosCep.uf || ''}
            editable={false}
            style={styles.resultInput}
            mode="outlined"
          />
          <Divider style={styles.divider} />
          <Button
            mode="contained"
            onPress={limparCampos}
            style={styles.limparButton}
          >
            Limpar
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
  },
  title: {
    color: 'purple',
    fontWeight: 'bold',
    flexShrink: 1,
    maxWidth: '80%',
  },
  input: {
    marginBottom: 12,
    height: 40,
  },
  button: {
    marginBottom: 12,
    backgroundColor: 'purple',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  resultInput: {
    marginBottom: 10,
    height: 40,
  },
  divider: {
    backgroundColor: 'gray',
  },
  limparButton: {
    marginTop: 12,
    backgroundColor: 'red',
  },
});
