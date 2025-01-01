import { ConfigCategoryData } from "../../declarations"

export default class ConfigCategory {
  name: string
  description: string | undefined

  category: string

  constructor(data: ConfigCategoryData) {
    this.name = data.name
    this.description = data.description
    this.category = data.category
  }
}