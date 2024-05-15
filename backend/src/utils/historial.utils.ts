import { HTTP_STATUS } from "../config/constants";
import { IAnualHistorial, IAnualHistorialDataResponse } from "../interfaces/anualHistorial.interface";
import { IBankAccount } from "../interfaces/bankAccount.interface";
import { IHistorial } from "../interfaces/historial.interface";
import { IUserTransactionsResponse } from "../interfaces/transaction.interface";
import { IAllUserData } from "../interfaces/user.interface";
import { AnualHistorialModel } from "../models/db/entity/anual-historial.entity";
import { HistorialModel } from "../models/db/entity/historial.entity";
import anualHistorialService from "../services/anualHistorial.services";
import historialService from "../services/historial.services";
import HttpError from "./HttpError.utils";

export default class HistorialUtils {
  static async generateAnualHistorial(userData: IAllUserData) {
    let anual_historials: Partial<IAnualHistorialDataResponse[]> = [];
    let transactions: IUserTransactionsResponse = {
      sent: [],
      received: [],
    };

    userData.bank_account.dataValues.anual_historial.forEach(item => {
        anual_historials.push({ year: item.dataValues.year, month: {} });
        item.dataValues.months.forEach(historial => {
          switch (historial.dataValues.month) {
            case 1:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.jan = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 1)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 1)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break
            case 2:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.feb = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 2)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 2)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break
            case 3:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.mar = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 3)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 3)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break
            case 4:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.apr = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 4)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 4)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break 
            case 5:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.may = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 5)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 5)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break
            case 6:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.jun = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 6)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 6)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break 
            case 7:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.jul = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 7)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 7)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break
            case 8:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.aug = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 8)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 8)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break 
            case 9:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.sep = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 9)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 9)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break
            case 10:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.oct = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 10)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 10)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break
            case 11:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.nov = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 11)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 11)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break 
            case 12:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  userData.bank_account.dataValues.transactions_sent.forEach(sent => {
                    transactions.sent?.push({
                      id: sent.dataValues.id,
                      source_account: sent.dataValues.source_account,
                      destination_account: sent.dataValues.destination_account,
                      amount: sent.dataValues.amount,
                      date_transaction: sent.dataValues.date_transaction,
                      month: sent.dataValues.month.dataValues.month,
                      year: sent.dataValues.month.dataValues.year.dataValues.year,
                      to: {
                        user: {
                          name: sent.dataValues.to.dataValues.user.dataValues.name,
                          lastname: sent.dataValues.to.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  userData.bank_account.dataValues.transactions_received.forEach(received => {
                    transactions.received?.push({
                      id: received.dataValues.id,
                      source_account: received.dataValues.source_account,
                      destination_account: received.dataValues.destination_account,
                      amount: received.dataValues.amount,
                      date_transaction: received.dataValues.date_transaction,
                      month: received.dataValues.month.dataValues.month,
                      year: received.dataValues.month.dataValues.year.dataValues.year,
                      from: {
                        user: {
                          name: received.dataValues.from.dataValues.user.dataValues.name,
                          lastname: received.dataValues.from.dataValues.user.dataValues.lastname,
                        }
                      }
                    });
                  })
                  anual_historial.month.dec = {
                    balance: historial.dataValues.balance,
                    expenses: historial.dataValues.expenses,
                    investments: historial.dataValues.investments,
                    transactions: {
                      sent: transactions.sent
                        .filter(sent => sent?.year === historial.dataValues.year.dataValues.year)
                        .filter(sent => sent?.month === 12)
                        .filter(sent => sent?.source_account === userData.bank_account.dataValues.id),
                      received: transactions.received
                        .filter(received => received?.year === historial.dataValues.year.dataValues.year)
                        .filter(received => received?.month === 12)
                        .filter(received => received?.destination_account === userData.bank_account.dataValues.id),
                    }
                  };
                }
              })
              break
          }
        });
      })
    return anual_historials;
  }

  static async updateHistorials(account: Partial<IBankAccount>) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const anualHistorialFound = await anualHistorialService
      .getAnualHistorialsByBankAccount(account.id as number);

    const anual_historial = anualHistorialFound?.find(
      anual_historial => anual_historial.year === currentYear
    );

    const historialPayload: Partial<IHistorial> = {
      balance: account.balance,
      expenses: account.expenses,
      investments: account.investments,
    }

    const newHistorialPayload: Omit<Omit<IHistorial, 'id'>, 'anual_historial_id'> = {
      month: new Date().getMonth() + 1,
      balance: account.balance as number,
      expenses: account.expenses as number,
      investments: account.investments as number,
    }

    let historialData: Partial<HistorialModel> = {};
    let newAnualHistorialData: Partial<HistorialModel> = {};
    let newHistorialData: Partial<HistorialModel> = {};
    
    if (!anual_historial) {
      newAnualHistorialData === await this.createNewAnualHistorial(account.id as number, newHistorialPayload)
    } else {
      const historialFound = await historialService.getHistorial(anual_historial.id);
      if (historialFound?.dataValues.month === currentMonth) {
        historialData === await historialService.updateHistorial(
          historialFound.dataValues.id, 
          historialPayload
        )
      } else {
        newHistorialData === await historialService.createHistorial({
          anual_historial_id: anual_historial?.dataValues.id as number,
          ...newHistorialPayload
        })
      }
    }
      
    return { historialData, newHistorialData, newAnualHistorialData };
  }

  static async createNewAnualHistorial(
    account: number, 
    newHistorialPayload: Omit<Omit<IHistorial, 'id'>, 'anual_historial_id'>
  ) {
    const newAnualHistorialPayload: Omit<IAnualHistorial, 'id'> = {
      bank_account: account,
      year: new Date().getFullYear(),
    }
    const anualHistorialCreated = await anualHistorialService.createAnualHistorial(newAnualHistorialPayload);
    
    if (!anualHistorialCreated) {
      throw new HttpError(
        'Anual historial not created',
        'Anual historial not created',
        HTTP_STATUS.SERVER_ERROR
      )
    }

    const historialCreated = await historialService.createHistorial({
      anual_historial_id: anualHistorialCreated.dataValues.id,
      ...newHistorialPayload,
    })

    if (!historialCreated) {
      throw new HttpError(
        'Historial not created',
        'Historial not created',
        HTTP_STATUS.SERVER_ERROR
      )
    }

    return { anualHistorialCreated, historialCreated };
  }
}