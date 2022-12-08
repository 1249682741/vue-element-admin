/**
 * 判断是否外链
 * @param path
 * @returns
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const isInput = (type: string) => /text|textarea/.test(type)

export const isSelect = (type: string) => /select/.test(type)

export const isRadio = (type: string) => /radio/.test(type)
