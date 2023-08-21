/**
 * 判断是否外链
 * @param path
 * @returns
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const isInput = (type: string) => /text|textarea|number/.test(type)

export const isSelect = (type: string) => type == 'select'

export const isRadio = (type: string) => /radio/.test(type)

export const isCheckbox = (type: string) => /checkbox/.test(type)

const DatePickerTypeArr = ['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange']
export const isDatePicker = (type: string) => DatePickerTypeArr.includes(type)

/**
 * 正则表达式验证手机号码
 * @param mobile string
 * @returns true|false
 */
export const validMobile = (mobile: string) => /^1[3|4|5|6|7|8|9]\d{9}$/.test(mobile)

/**
 * 电子邮箱的校验
 * @param email string
 * @returns true|false
 */
export const validEmail = (email: string) => /^\w+([-_.]\w+)*@(\w+[-_.])+\w{2,4}$/.test(email)
