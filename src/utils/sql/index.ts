// 值相等
export const whereEqual = (sqlname: string, value: any) => {
  return value ? `${sqlname} = '${value}' and` : '';
};

// 模糊查询
export const whereLike = (sqlname: string, value: any) => {
  return value ? `${sqlname} like '%${value}%' and` : '';
};

//值大于
export const whereOver = (sqlname: string, value: any) => {
  return value ? `${sqlname} >= '${value}' and` : '';
};

//值大于
export const whereNotEmpty = (sqlname: string, value: any) => {
  return value ? `${sqlname} != '' and` : '';
};
