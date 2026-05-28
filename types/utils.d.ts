type ValidationFunction = (value: any) => any

type Validations<T> = {
  [K in keyof T]?: ValidationFunction[]
}

type FormErrors<T> = {
  [K in keyof T]: string
}
