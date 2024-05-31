import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import ASSESSMENT_ANIMAL from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Animal__c";
import ASSESSMENT_PERFORMED_AT from "@salesforce/schema/animalshelters__Assessment__c.ASCS_Assessment_Performed_At__c";
import ASSESSMENT_PERFORMED_BY from "@salesforce/schema/animalshelters__Assessment__c.ASCS_Assessment_Performed_By__c";
import ASSESSMENT_DATE from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Assessment_Date_Time__c";
import ASSESSMENT_NAME from "@salesforce/schema/animalshelters__Assessment__c.Name";
import ASSESSMENT_TYPE from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Assessment_Type__c";

export default class SjEditAssessementCmp extends LightningElement {
    @api recordId;
    @api objectApiName;
  
    get animalField() {
      return ASSESSMENT_ANIMAL;
    }
  
    get performedAtField() {
      return ASSESSMENT_PERFORMED_AT;
    }
  
    get performedByField() {
      return ASSESSMENT_PERFORMED_BY;
    }
  
    get dateField() {
      return ASSESSMENT_DATE;
    }
  
    get typeField() {
      return ASSESSMENT_TYPE;
    }
  
    get nameField() {
      return ASSESSMENT_NAME;
    }
  
    @wire(getRecord, { recordId: "$recordId", fields: [ASSESSMENT_ANIMAL] })
    record;
  
    get name() {
      return this.record &&
        this.record.data &&
        this.record.data.fields &&
        this.record.data.fields.Name
        ? this.record.data.fields.Name.value
        : "";
    }
  
    onSuccess(event) {
      console.log("Updated contact", event.detail);
      // Dismiss modal on success
      this.dismiss(event);
    }
  
    dismiss(event) {
      console.log("Dismissing modal", event.detail);
      // TODO: Can we use window.history.back() here?
      // eslint-disable-next-line no-restricted-globals
      history.back();
    }
}