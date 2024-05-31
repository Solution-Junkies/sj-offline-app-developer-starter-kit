import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

export default class SjViewAnimal extends LightningElement {
  @api recordId;
  @api objectApiName;


  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}