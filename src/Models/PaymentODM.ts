// src/Models/PaymentODM.ts

import {
    Model,// Model é uma classe do Mongoose
    Schema,
    model,
    models,
    isValidObjectId,
    UpdateQuery,
  } from 'mongoose';
  import IPayment from '../Interfaces/IPayment';
  
  class PaymentODM {
    private schema: Schema; // Atributo para o "molde"
    private model: Model<IPayment>; // Atributo para criar coleção e fornecer acesso ao banco
  
    constructor() {
      this.schema = new Schema<IPayment>({
        payByPerson: { type: String, required: true },
        payToPerson: { type: String, required: true },
        amount: { type: Number, required: true },
        key: { type: String, required: true },
        status: { type: Number},
      });
      this.model = models.Payment || model('Payment', this.schema); // Antes de criar o Schema, verificar se o schema já existe. Caso não exista, o schema será criado. 
    }
  
    public async create(payment: IPayment): Promise<IPayment> {
      return this.model.create({ ...payment });
    }

    public async update(id: string, obj: Partial<IPayment>): Promise<IPayment | null> {
      if(!isValidObjectId(id)) throw new Error('Invalid ID!');
         return this.model.findByIdAndUpdate(
    { _id: id }, { ...obj} as UpdateQuery<IPayment>, { new: true });
  
    }

    public async findAll(): Promise<IPayment[]> {
      return this.model.find();
    }

    public async findBykey(key: string): Promise<IPayment[] | null> {
      return this.model.find({ key }) || [];
  }
  }
  
  export default PaymentODM;