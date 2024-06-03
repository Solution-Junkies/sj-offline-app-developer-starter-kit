import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import ANIMAL_NAME from "@salesforce/schema/animalshelters__Animal__c.animalshelters__Animal_Name__c";
import ANIMAL_BREED from "@salesforce/schema/animalshelters__Animal__c.animalshelters__Breed_Lookup__c";
import ANIMAL_DOA from "@salesforce/schema/animalshelters__Animal__c.animalshelters__Date_of_Arrival__c";
import ANIMAL_STATUSREASON from "@salesforce/schema/animalshelters__Animal__c.ASCS_Status_Reason__c";
import ANIMAL_STATUS from "@salesforce/schema/animalshelters__Animal__c.animalshelters__Animal_Status__c";
import ANIMAL_DOB from "@salesforce/schema/animalshelters__Animal__c.animalshelters__Date_of_Birth__c";
import ANIMAL_ENTRYACC from "@salesforce/schema/animalshelters__Animal__c.ASCS_Entry_Account__c";
//import getAccounts from '@salesforce/apex/SJ_GetAccounts.getAccounts';
export default class SjEditAnimal extends LightningElement {
  @api recordId;
  @api objectApiName;
  selectedId;

  //@wire(getAccounts) accounts;

  get animalName() {
    return ANIMAL_NAME;
  }

  // get animalBreed() {
  //   return ANIMAL_BREED;
  // }

  get animalDOA() {
    return ANIMAL_DOA;
  }

  get animalStatusReason() {
    return ANIMAL_STATUSREASON;
  }

  get animalStatus() {
    return ANIMAL_STATUS;
  }

  get animalDOB() {
    return ANIMAL_DOB;
  }
  get initialValue() {
    return "";
  }

  @wire(getRecord, { recordId: "$recordId", fields: [ANIMAL_NAME, ANIMAL_BREED, ANIMAL_DOA, ANIMAL_STATUSREASON, ANIMAL_STATUS, ANIMAL_DOB] })
  
  record;
  
  get name() {
    return this.record &&
      this.record.data &&
      this.record.data.fields &&
      this.record.data.fields.Name
      ? this.record.data.fields.Name.value
      : "";
  }

  submit(event) {
    // stop the form from submitting; add selectedId to the form fields
    event.preventDefault();
    const fields = event.detail.fields;
    console.log('fields=> '+fields);
    if (this.selectedId) {
      fields[this.accountField.fieldApiName] = this.selectedId;
    }

    // submit the form with the updated fields
    this.template.querySelector("lightning-record-edit-form").submit(fields);
  }

  onSuccess(event) {
    console.log("Updated Animal", event.detail);
    // Dismiss modal on success
    this.dismiss(event);
  }
    
  dismiss(event) {
    console.log("Dismissing modal", event.detail);
    // TODO: Can we use window.history.back() here?
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }

  handleChange(event) {
    // capture the selected accountId from the lookup field
    this.selectedId = event.detail.recordId;
    console.log("You selected a breed: " + this.selectedId);
  }
}