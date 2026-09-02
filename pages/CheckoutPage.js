export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByRole("textbox", { name: "First Name" });
    this.lastName = page.getByRole("textbox", { name: "Last Name" });
    this.zipCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.confirmationMessage = page.getByText("Thank you for your order!", {exact: true});
    this.cancelButton = page.getByRole('button', { name: 'Cancel' })
  }



  errorMessage(fieldName) {
    return this.page.getByText(`Error: ${fieldName} is required`, {
      exact: true,
    });
  }
  async fillInfo(firstName, lastName, zipCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

    async cancel() {
      await this.cancelButton.click()
}



}
