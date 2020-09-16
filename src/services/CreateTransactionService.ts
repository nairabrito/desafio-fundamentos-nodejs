import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {

      throw Error ('Transaction type is invalid ');
    }

    const  { total } = this.transactionsRepository.getBalance();
      if(type == 'outcome' && total < value ) {
        throw Error ('The transaction exceeds the cash value ');
      }
      
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
    
    // if(transaction) {
    //   throw Error ('Transaction exceeds cash value ');
      
    // }
  }
}

export default CreateTransactionService;
