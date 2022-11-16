//tests/unit/services/keyRegister.test.ts
import Key from '../../../src/Domain/Key/Key';

import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

describe('Deveria validar e criar chaves', function () {
  it('Criando uma chave de tipo CPF com SUCESSO', async function () {
    // Arrange
    const keyInput: IKey = {
        value: '478.966.190-32',
        owner: 'Jack C.',
        type: 'cpf',
      };
      const keyOutput: Key = new Key(
        '478.966.190-32',
        'Jack C.',
        'cpf',
        '633ec9fa3df977e30e993492',
      );
    //  sinon.stub(Model, 'create').resolves(keyOutput);
    // Act
    const service = new KeyService();
    const result = await service.register(keyInput);
    // Assert
    expect(result).to.be.deep.equal(keyOutput);
  });

  it('Criando uma chave de tipo CPF inválida', async function () {
    // Arrange
    const keyInput: IKey = {
        value: '478.966.190-32XX',
        owner: 'Jack C.',
        type: 'cpf',
      };
      // sinon.stub(Model, 'create').resolves({});
    // Act
    try {
        const service = new KeyService();
        await service.register(keyInput);
      } catch (error) {
    // Assert
    expect((error as Error).message).to.be.equal(RESULT_ERROR);
}
});
  

  it('Criando chave de tipo Phone Number com SUCESSO', async function () {
    // Arrange
    const keyInput: IKey = {
        value: '11-99999-9999',
        owner: 'Jack C.',
        type: 'cpf',
      };
      const keyOutput: Key = new Key(
        '11-99999-9999',
        'Jack C.',
        'cpf',
        '633ec9fa3df977e30e993492',
      );
    // Act
    const service = new KeyService();
    const result = await service.register(keyInput);
    // Assert
    expect(result).to.be.deep.equal(keyOutput);
  });

  it('Criando chave de tipo Phone Number é inválida', async function () {
    // Arrange
    const keyInput: IKey = {
        value: '11-99999-9999XX',
        owner: 'Jack C.',
        type: 'cpf',
        };
    // sinon.stub(Model, 'create').resolves({});
    // Act
    try {
        const service = new KeyService();
        await service.register(keyInput);
        } catch (error) {        
    // Assert
    expect((error as Error).message).to.be.equal(RESULT_ERROR);
}
  });
  afterEach(function () {
    // sinon.restore();
  });
});

// tests/unit/services/keyRegister.test.ts

/*...*/

it('Criando chave de tipo Random com SUCESSO', async function () {
  const keyInput: IKey = {
      value: '123e4567-e12b-12d1-a456-426655440000',
      owner: 'Martha',
      type: 'random',
  };
  const keyOutput: Key = new Key(
      '123e4567-e12b-12d1-a456-426655440000',
      'Martha',
      'random',
      '633ec9fa3df977e30e993492',
  );
  sinon.stub(Model, 'create').resolves(keyOutput);

  const service = new KeyService();
  const result = await service.register(keyInput);

  expect(result).to.be.deep.equal(keyOutput);
});

it('Criando chave de tipo Random é inválida', async function () {
  const keyInput: IKey = {
      value: '123',
      owner: 'Martha',
      type: 'random',
  };
  sinon.stub(Model, 'create').resolves({});
  
  try {
      const service = new KeyService();
      await service.register(keyInput);
  } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
  }
});

/*...*/