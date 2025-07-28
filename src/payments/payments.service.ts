import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payment, PaymentDocument } from './payment.schema';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  async create(paymentData: Partial<Payment>): Promise<Payment> {
    const payment = new this.paymentModel(paymentData);
    return payment.save();
  }

  async findAll(filter = {}, page = 1, limit = 10): Promise<Payment[]> {
    return this.paymentModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async getStats() {
    // Simple example: total payments and sum of amounts
    const totalPayments = await this.paymentModel.countDocuments().exec();
    const totalAmount = await this.paymentModel.aggregate([
      { $group: { _id: null, sum: { $sum: '$amount' } } },
    ]);
    return {
      totalPayments,
      totalAmount: totalAmount[0]?.sum || 0,
    };
  }
}
