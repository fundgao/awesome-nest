// 值相等
export const whereEqual = (sqlname: string, value: any) => {
  return value ? `${sqlname} = '${value}' and` : '';
};

// 模糊查询
export const whereLike = (sqlname: string, value: any) => {
  return value ? `${sqlname} like '%${value}%' and` : '';
};

// 值大于
export const whereOver = (sqlname: string, value: any) => {
  return value ? `${sqlname} > '${value}' and` : '';
};

// 值小于
export const whereLess = (sqlname: string, value: any) => {
  return value ? `${sqlname} < '${value}' and` : '';
};

// 两者之间
export const whereBetween = (sqlname: string, value1: any, value2: any) => {
  return value1 && value2
    ? `${sqlname} between '${value1}' and '${value2}' and`
    : '';
};

// 值不为空
export const whereNotEmpty = (sqlname: string, value: any) => {
  return value ? `${sqlname} != '' and` : '';
};

// 值在数组
export const whereInArray = (sqlname: string, value: any) => {
  if (value) {
    const arr = value.split(',');

    return `${sqlname} in (${arr.join()}) and`;
  }
  return '';
};

// 值不在数组
export const whereNotInArray = (sqlname: string, value: any) => {
  if (value) {
    const arr = value.split(',');

    return `${sqlname} not in (${arr.join()}) and`;
  }
  return '';
};
