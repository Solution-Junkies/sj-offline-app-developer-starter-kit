import { LightningElement, api } from "lwc";

import ANIMAL_FIELD from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Animal__c";
import TYPE_FIELD from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Assessment_Type__c";
import DATE_FIELD from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Assessment_Date_Time__c";
import COMMENTS_FIELD from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__General_Comments__c";
import WEIGHT_FIELD from "@salesforce/schema/animalshelters__Assessment__c.ASCS_Weight__c";

export default class SjCreateAssessmentCmp extends LightningElement {
    @api recordId;
    @api objectApiName;
  
    get animalField() {
      return ANIMAL_FIELD;
    }
  
    get typeField() {
      return TYPE_FIELD;
    }
  
    get dateField() {
      return DATE_FIELD;
    }
  
    get commentsField() {
      return COMMENTS_FIELD;
    }
  
    get weightField() {
      return WEIGHT_FIELD;
    }
  
    get initialValue() {
      return "";
    }
  
    selectedId;

    handleChange(event) {
      // capture the selected animal ID from the lookup field
      this.selectedId = event.detail.recordId;
      console.log("You selected an animal: " + this.selectedId);
    }
  
    onSubmit(event) {
      // stop the form from submitting; add selectedId to the form fields
      event.preventDefault();
      const fields = event.detail.fields;
      if (this.selectedId) {
        fields[this.accountField.fieldApiName] = this.selectedId;
      }
  
      // submit the form with the updated fields
      this.template.querySelector("lightning-record-edit-form").submit(fields);
    }
  
    onSuccess(event) {
      console.log("Created an assessment", event.detail);
      // Dismiss modal on success
      this.dismiss(event);
    }
  
    onError(event) {
      console.error("Failed to create contact", event);
    }
  
    dismiss(event) {
      console.log("Dismissing modal", event.detail);
      // TODO: Can we use window.history.back() here?
      // eslint-disable-next-line no-restricted-globals
      history.back();
    }
}