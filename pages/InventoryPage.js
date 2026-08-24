
import { HeaderComponent } from "../components/HeaderComponent.js"

        export class InventoryPage  {

                constructor(page){
                    this.page = page
                    this.header = new HeaderComponent(page)
                    this.title = page.locator('[data-test="title"]')
                }

        async isLoggedIn(){
             return await this.title.isVisible()
        }

    }