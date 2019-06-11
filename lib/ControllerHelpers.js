export function addTransactions(array, type, transactions_this_month, transactions_30_days) {
   const formatted_array = [];
   let count = 0;
   for (let i = 0; i < array.length; i++) {
      const element = { ...array[i]._doc };
      const this_month = transactions_this_month.filter(item => element._id.equals(item[type]));
      const thirty_days = transactions_30_days.filter(item => element._id.equals(item[type]));
      element.this_month = this_month;
      element.thirty_days = thirty_days;
      if (type === 'category') {
         element.month_total = balanceReducer(this_month);
         element.thirty_total = balanceReducer(thirty_days);
      }
      formatted_array.push(element);
   }
   console.log('array[array.length - 1]:::', array[array.length - 1]);
   return formatted_array;
}

function balanceReducer(transactions) {
   if (transactions)
      return transactions.reduce((total, item) => total + item.amount, 0)
}