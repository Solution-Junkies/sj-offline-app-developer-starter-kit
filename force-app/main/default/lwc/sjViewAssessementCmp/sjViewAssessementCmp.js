import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import ASSESSMENT_ANIMAL from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Animal__c";
import ASSESSMENT_PERFORMED_AT from "@salesforce/schema/animalshelters__Assessment__c.ASCS_Assessment_Performed_At__c";
import ASSESSMENT_PERFORMED_BY from "@salesforce/schema/animalshelters__Assessment__c.ASCS_Assessment_Performed_By__c";
import ASSESSMENT_DATE from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Assessment_Date_Time__c";
import ASSESSMENT_CONDITIONS from "@salesforce/schema/animalshelters__Assessment__c.ASCS_Assessment_Conditions__c";
import ASSESSMENT_NAME from "@salesforce/schema/animalshelters__Assessment__c.Name";
import ASSESSMENT_TYPE from "@salesforce/schema/animalshelters__Assessment__c.animalshelters__Assessment_Type__c";

export default class sjViewAssessment extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [
      ASSESSMENT_ANIMAL,
      ASSESSMENT_PERFORMED_AT,
      ASSESSMENT_PERFORMED_BY,
      ASSESSMENT_DATE,
      ASSESSMENT_CONDITIONS,
      ASSESSMENT_NAME,
      ASSESSMENT_TYPE,
    ];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}
