// 列表接口的参数类型定义自动混杂PageProps
declare type withPage<T> = T & PageProps

declare type withSelectOptions<T> = T & selectOptions

declare type withUploadHandle<T> = T & UploadHandle

declare interface selectOptions {
  label: string
  value: number | string
}

// pagination 组件需要的props
declare interface PageProps {
  pageNum: number
  pageSize: number
  total: number
}

declare interface UploadHandle {
  discardUrls: string[]
  usefulUrls: string[]
}

// CustomerForm 组件需要的config prop
declare interface FormConfig {
  label: string
  prop: string
  type: string
  options?: any[] | Ref<any[]>
  optionLabel?: string
  optionValue?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  format?: string
  append?: string
  [propName: string]: any
}

// dialog的操作类型
declare type DialogType = 'add' | 'edit'

declare type CustomRouteMeta = {
  title?: string
  icon?: string
  affix?: boolean
  noCache?: boolean
  breadcrumb?: boolean
}

declare type CustomRouteRecordRaw = RouteRecordRaw & {
  name?: RouteRecordName
  hidden?: boolean
  alwaysShow?: boolean
  meta?: CustomRouteMeta
}
