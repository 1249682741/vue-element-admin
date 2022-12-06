// 列表接口的参数类型定义自动混杂PageProps
declare type withPage<T> = T & PageProps

// pagination 组件需要的props
declare type PageProps = {
  pageNum: number
  pageSize: number
  total: number
}

// CustomerForm 组件需要的config prop
declare type FormConfig = {
  label: string
  prop: string
  type: string
  options?: any[]
  optionLabel?: string
  optionValue?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
}
