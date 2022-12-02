export const resolve = (parentPath: string, childrenPath: string): string => {
  if (!parentPath.endsWith('/')) {
    parentPath += '/'
  }

  if (childrenPath.startsWith('/')) {
    childrenPath = childrenPath.substring(1)
  }

  return parentPath + childrenPath
}