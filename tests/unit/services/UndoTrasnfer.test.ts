import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IPayment from '../../../src/Interfaces/IPayment';
import TransferService from '../../../src/Services/TransferService';
import Payment from '../../../src/Domain/Payment';

describe('lançando exceção quando se tenta extornar o trix', function () {
    it('Deveria lançar uma exceção quando a key é inválida', async function () {
      // Arrange
      const paymentInput: IPayment = {
        payByPerson: 'Jobs',
        payToPerson: 'Wozniak',
        amount: 50000,
        key: '858.898.670-16XX', // 👀 observe que estamos passando um CPF inválido para capturar a exceção!
      };

      const id = '636e7f72a3498785d585ab25';

      sinon.stub(Model, 'update').resolves();
      // Act
      try {
        const service = new TransferService();
        await service.undoTransfer( id, paymentInput);
      } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal('Invalid Key!');
      }
    });
    
    afterEach(function () {
        sinon.restore();
  })
});