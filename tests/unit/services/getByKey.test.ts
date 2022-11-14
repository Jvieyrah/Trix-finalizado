// tests/unit/services/getByKey.test.ts

import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import PaymentStatus from '../../../src/Utils/PaymentStatus';
import TransferService from '../../../src/Services/TransferService';
import Payment from '../../../src/Domain/Payment';

describe('Deveria buscar uma transferência por key', function () {
  it('Deveria retornar a lista das transferências por key', async function () {
    // Arrange
    const paymentOutput = new Payment(
      'Vinicius',
      'Ricardo',
      50,
      '187.401.600-33',
      '63319d80feb9f483ee823ac5',
      PaymentStatus.concluded,
    );
    sinon.stub(Model, 'find').resolves(paymentOutput as any);

    // Act
    const service = new TransferService();
    const result = await service.listTransfersByKey('187.401.600-33');

    // Assert
    expect(result).to.be.deep.equal(paymentOutput);

    sinon.restore();
  });  
});