import { IBankAccount } from "../Interfaces/user.interface";
import { 
  ITransactionsReceived, 
  ITransactionsSent 
} from "../Interfaces/transactions.interface";

export const transactions = (bank_account: IBankAccount | undefined ) => {
  let sent: ITransactionsSent[] = [];
  let received: ITransactionsReceived[] = [];
    
  bank_account?.anual_historial.forEach(anual => {
    anual.month.jan?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.jan?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.feb?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.feb?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.mar?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.mar?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.apr?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.apr?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.may?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.may?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.jun?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.jun?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.jul?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.jul?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.aug?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.aug?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.sep?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.sep?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.oct?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.oct?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.nov?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.nov?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
    anual.month.dec?.transactions.received?.forEach(item => {
      received.push(item)
    })
    anual.month.dec?.transactions.sent?.forEach(item => {
      sent.push(item)
    })
  })

  return { sent, received }
}