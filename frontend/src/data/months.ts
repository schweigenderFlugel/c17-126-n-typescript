import { MONTHS } from "./enums";

export const setMonth = (monthNumber: number) => {
    let month: string;
    switch (monthNumber) {
      case 1:
        month = MONTHS.JANUARY;
        break;
      case 2: 
        month = MONTHS.FEBRUARY;
        break;
      case 3:
        month = MONTHS.MARCH;
        break;
      case 4: 
        month = MONTHS.APRIL;
        break;
      case 5:
        month = MONTHS.MAY;
        break;
      case 6: 
        month = MONTHS.JUNE;
        break;
      case 7:
        month = MONTHS.JULY;
        break;
      case 8: 
        month = MONTHS.AUGUST;
        break;
      case 9:
        month = MONTHS.SEPTEMBER;
        break;
      case 10: 
        month = MONTHS.OCTOBER;
        break;
      case 11:
        month = MONTHS.NOVEMBER;
        break;
      case 12: 
        month = MONTHS.DECEMBER;
        break;
      default: 
        month = 'Invalid month';
        break;
    }
    return { month }
}